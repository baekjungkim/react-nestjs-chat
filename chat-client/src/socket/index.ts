import { io, Socket } from 'socket.io-client';

class ChatSocket {
  socket: Socket;

  constructor() {
    this.socket = io(
      `${process.env.REACT_APP_SOCKET_API}`,
      {
        transports: ["websocket"],
        auth: {
          userid: window.localStorage.getItem('userId') || ''
        }
      }
    );
  }
}

export default ChatSocket;