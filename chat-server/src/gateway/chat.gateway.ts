import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { Check } from 'src/entity/check.entity';
import { JoinChat } from 'src/entity/joinChat.entity';
import { Message } from 'src/entity/message.entity';
import { MessageCheckDto, SendMessageDto } from './chat.dto';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

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

    const checks: Check[] = await this.chatService.checkMsg(
      userId,
      data.messageIds,
    );
    this.server.to(`${data.chatId}`).emit('message-check', {
      chatId: data.chatId,
      range: data.messageIds,
      checks,
    });
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log('handleConnection');
    // const { userid }: Headers =
    //   (client.handshake.headers as unknown as Headers) ||
    //   (client.handshake.auth.userid as unknown as Headers);
    const userId: number | boolean = this.getUserId(client);
    if (!userId) return;

    const chats: JoinChat[] = await this.chatService.getJoinChats(userId);
    chats.forEach((chat: JoinChat) => {
      client.join(`${chat.chat.id}`);
    });
    // 포함된 채팅방 room join
    console.log('connected');
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    // room leave
    const userId: number | boolean = this.getUserId(client);

    if (!userId) return;
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
