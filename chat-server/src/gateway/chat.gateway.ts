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
import {
  ChatJoined,
  MessageCheckDto,
  MessageCheckRangeDto,
  SendMessageDto,
} from './chat.dto';

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

    const message: Message = await this.chatService.sendMsg({
      ...data,
      userId: parseInt(userId),
    });

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
    const checkMesssageRange: [number, number] | boolean =
      await this.chatService.checkMsg(userId, data.chatId, data.toMessageId);

    if (!checkMesssageRange) return;

    this.server.to(`${data.chatId}`).emit('message-check', {
      checkMesssageRange,
      checkerId: data.checkerId,
    });
  }

  @SubscribeMessage('message-check-room-enter')
  async handleMessageCheckByRoomEnter(
    @MessageBody() data: MessageCheckRangeDto,
    @ConnectedSocket() client: Socket,
  ) {
    // broadcast
    this.server.to(`${data.chatId}`).emit('message-check-room-enter', data);
  }

  @SubscribeMessage('chat-joined')
  async createChat(
    @MessageBody() data: ChatJoined,
    @ConnectedSocket() client: Socket,
  ) {
    const chatId = data.chat.id;

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
    console.log(userId);
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
