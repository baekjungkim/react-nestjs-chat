import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { JoinChat } from 'src/entity/joinChat.entity';
import { Message } from 'src/entity/message.entity';
import { ChatJoined, MessageCheckDto, SendMessageDto } from './chat.dto';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  client = {};

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const userId =
      client.handshake.headers.userid || client.handshake.auth.userid;

    if (!userId) return;

    console.log('[EVENT] message', userId);

    console.log(data);
    const message: Message = await this.chatService.sendMsg({
      ...data,
      userId: parseInt(userId),
    });
    console.log(message);
    console.log(data);
    this.server.to(`${data.chatId}`).emit('message', message);

    return 1;
  }

  @SubscribeMessage('message-check')
  async handleMessageCheck(
    @MessageBody() data: MessageCheckDto,
    @ConnectedSocket() client: Socket,
  ) {
    const userId: number | boolean = this.getUserId(client);

    if (!userId) return;

    await this.chatService.checkMsg(userId, data.chatId);
  }

  @SubscribeMessage('chat-joined')
  async createChat(
    @MessageBody() data: ChatJoined,
    @ConnectedSocket() client: Socket,
  ) {
    const chatId = data.chat.id;

    client.join(`${chatId}`);
    data.joinIds.forEach((joinId: number) => {
      if (this.client[joinId]) {
        this.client[joinId].join(`${chatId}`);
        this.server.to(this.client[joinId].id).emit('chat-joined', data);
      }
    });
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log('handleConnection');
    const userId: number | boolean = this.getUserId(client);
    if (!userId) return;
    this.client[userId] = client;
    const chats: JoinChat[] = await this.chatService.getJoinChats(userId);
    chats.forEach((chat: JoinChat) => {
      client.join(`${chat.chat.id}`);
    });
    console.log('connected');
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('handleDisconnect');
    const userId: number | boolean = this.getUserId(client);

    if (!userId) return;
    delete this.client[userId];
    const chats: JoinChat[] = await this.chatService.getJoinChats(userId);
    chats.forEach((chat: JoinChat) => {
      client.leave(`${chat.chat.id}`);
    });
    console.log('disconnected');
  }

  getUserId(client: Socket): number {
    const userId =
      client.handshake.headers.userid || client.handshake.auth.userid;

    if (!userId) return 0;
    return parseInt(userId);
  }
}
