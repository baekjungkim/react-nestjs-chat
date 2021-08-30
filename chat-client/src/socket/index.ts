import { io, Socket } from 'socket.io-client';

export class ChatSocket {
  private readonly socket: Socket = io(
    `${process.env.REACT_APP_SOCKET_API}`,
    {
      transports: ["websocket"],
      auth: {
        userid: window.localStorage.getItem('userId') || ''
      }
    }
  )

  constructor() {}

  emitChatJoined(data: any) {
    this.socket.emit('chat-joined', data);
  }

  emitMessage(data: any) {
    this.socket.emit('message', data);
  }

  emitMessageCheck(data: any) {
    this.socket.emit('message-check', data);
  }

  // 채팅방 생성 알림
  onChatJoined(cb: any) {
    console.log('event mount onChatJoined')
    this.socket.on('chat-joined', cb);
  }

  // 메시지 수신 알림
  onReceiveMessage(cb: any) {
    this.socket.on('message', cb);
  }

  offChatJoined(cb: any) {
    this.socket.off('chat-joined', cb);
  }

  offReceiveMessage(cb: any) {
    this.socket.off('message', cb);
  }
}

export default new ChatSocket();