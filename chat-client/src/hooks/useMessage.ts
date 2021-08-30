import { useState, useEffect } from 'react';

import { getMessages } from '../apis/chat';
import chatSocket, {ChatSocket} from '../socket';


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
  const [socket] = useState<ChatSocket>(chatSocket);
  const [messages, setMessage] = useState<Message[]>([]);

  useEffect(() => {
    const receiveMsg = (msg: Message) => {
      if (!isSameChat(msg)) {
        notification(msg);
        return
      }
      socket.emitMessageCheck({
        chatId,
        userId: window.localStorage.getItem('userId') || '',
      })
      setMessage([...messages, msg]);
    }

    socket.onReceiveMessage(receiveMsg);
    return () => {
      socket.offReceiveMessage(receiveMsg);
    }
  }, [socket, messages]); 

  useEffect(() => {
    (async () => {
      const { data } = await getMessages(chatId, window.localStorage.getItem('userId') || '');
      setMessage(data);
    })();
  }, [chatId]);

  const isSameChat = (msg: Message) => {
    return msg.chat.id === chatId;
  }

  const sendMessage = (message: string, msgType: string = 'text') => {
    socket.emitMessage({
      chatId,
      msg: message,
      msgType,
    });
  }

  return { messages, sendMessage };
}

export default useMessage;