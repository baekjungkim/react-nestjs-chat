import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, LessThan, Repository } from 'typeorm';

import { Connection } from 'typeorm';

import { Chat } from 'src/entity/chat.entity';
import { JoinChat } from 'src/entity/joinChat.entity';
import { Message } from 'src/entity/message.entity';
import { User } from 'src/entity/user.entity';
import { CreateChatDto, MessageDto } from './chat.dto';
import { Check } from 'src/entity/check.entity';

/*
채팅목록 조회 + 마지막 채팅 포함
SELECT 
  * 
FROM 
	join_chat 
LEFT JOIN 
	chat 
ON
	chat.id = join_chat.chatId
LEFT JOIN 
	message
ON
	message.id = (SELECT id FROM message ORDER BY id DESC LIMIT 1)
    AND chat.id = message.chatId
WHERE 
	join_chat.userId= 1;
*/

@Injectable()
export class ChatService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(JoinChat)
    private readonly joinChatRepository: Repository<JoinChat>,
    @InjectRepository(Check)
    private readonly checkRepository: Repository<Check>,
  ) {}

  async getJoinChats(userId: number): Promise<JoinChat[]> {
    // const user: User = await this.userRepository.findOne(userId);
    const columns = [
      'join_chat.id AS id',
      'chat.id AS chatId',
      'chat.name AS chatName',
      'chat.password AS chatPassword',
      'chat.createdAt AS chatCreatedAt',
      'message.msg AS msg',
      'message.msgType AS msgType',
      'message.userId AS msgUserId',
      'message.createdAt AS msgCreatedAt',
    ];
    const result: JoinChat[] = await this.connection.query(`
      SELECT 
        ${columns.join(',')}
      FROM 
        join_chat 
      LEFT JOIN 
        chat 
      ON
        chat.id = join_chat.chatId
      LEFT JOIN 
        message
      ON
        message.id = (SELECT id FROM message ORDER BY id DESC LIMIT 1)
          AND chat.id = message.chatId
      WHERE 
        join_chat.userId= ${userId}
    `);
    console.log(result);
    return result;
    // return await this.joinChatRepository.find({
    //   where: {
    //     user,
    //   },
    //   relations: ['chat'],
    // });
  }

  async getChatMessages(chatId: number, fromId: number): Promise<Message[]> {
    const chat: Chat = await this.chatRepository.findOne(chatId);
    const where = {
      chat,
      id: LessThan(fromId),
    };

    if (!fromId) delete where.id;

    return await this.messageRepository.find({
      where,
      select: ['id', 'msg', 'msgType', 'createdAt'],
      order: {
        createdAt: 'ASC',
      },
      relations: ['checks', 'user'],
      take: 200,
    });
  }

  async createChat(payloadChat: CreateChatDto) {
    const user: User = await this.userRepository.findOne(payloadChat.userId);
    const users: User[] = await this.userRepository.find({
      where: {
        id: In(payloadChat.joinIds),
      },
    });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const createdChat = await this.chatRepository.create({
        user,
        name: payloadChat.name,
        password: payloadChat.password,
      });
      const chat = await queryRunner.manager.save(Chat, createdChat);

      const joineds: { user: User; chat: Chat }[] = [...users, user].map(
        (user: User) => ({
          user,
          chat,
        }),
      );
      const joinChats = await queryRunner.manager.save(JoinChat, joineds);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        chat,
        joinChats,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return {
        chat: {},
        joinChats: [],
      };
    }
  }

  async sendMsg(payloadMsg: MessageDto) {
    // Message row 생성
    // check row 생성
    const user: User = await this.userRepository.findOne(payloadMsg.userId);
    const chat: Chat = await this.chatRepository.findOne(payloadMsg.chatId);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const createdMsg: Message = await this.messageRepository.create({
        user,
        chat,
        msg: payloadMsg.msg,
        msgType: payloadMsg.msgType,
      });
      const message: Message = await queryRunner.manager.save(
        Message,
        createdMsg,
      );

      const createdCheck: Check = await this.checkRepository.create({
        user,
        message,
      });
      await queryRunner.manager.save(Check, createdCheck);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return message;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      return {} as Message;
    }
  }

  async checkMsg(userId: number, msgIds: number[]) {
    const user: User = await this.userRepository.findOne(userId);
    const messages: Message[] = await this.messageRepository.find({
      where: {
        id: Between(msgIds[0], msgIds[1]),
      },
    });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const checks: Check[] = messages.map((message: Message) =>
        this.checkRepository.create({
          user,
          message,
        }),
      );
      await queryRunner.manager.save(Check, checks);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return checks;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      return [] as Check[];
    }
  }
}
