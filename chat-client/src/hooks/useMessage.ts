import { useState, useEffect } from 'react';
import { io, Socket } from "socket.io-client";
import { getMessages } from '../apis/chat';


export interface Message {
  id: number;
  user: {
    id: number;
    name: string;
    profileImage: string;
  };
  chat: {
    id: number;
    name: string;
  }
  msg: string;
  msgType: string;
  createdAt: string;
}

const useMessage = (chatId: number, notification: Function) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessage] = useState<Message[]>([]);

  useEffect(() => {
    const sock: Socket = io(
      `${process.env.REACT_APP_SOCKET_API}`,
      {
        transports: ["websocket"],
        auth: {
          userid: window.localStorage.getItem('userId') || ''
        }
      }
    )

    setSocket(sock);
  }, []);
  
  useEffect(() => {
    if (!socket) return;
    socket.on('message', receiveMsg);
    return () => {
      socket.off('message', receiveMsg);
    }
  }, [socket, messages]); 

  useEffect(() => {
    (async () => {
      const {data} = await getMessages(chatId, window.localStorage.getItem('userId') || '');
      
      setMessage(data);
      
    })();
  }, [chatId]);

  const receiveMsg = (msg: Message) => {
    if (!isSameChat(msg)) {
      // notification
      notification(msg);
      return
    }
    socket?.emit('message-check', {
      chatId,
      userId: window.localStorage.getItem('userId') || '',
    })
    setMessage([...messages, msg]);
  }

  const isSameChat = (msg: Message) => {
    return msg.chat.id === chatId;
  }

  const sendMessage = (message: string, msgType: string='text') => {
    socket?.emit('message', {
      chatId,
      msg: message,
      msgType,
    });
  }

  return { messages, sendMessage };
}

export default useMessage;