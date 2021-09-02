import { useState, useEffect } from 'react';

import { getMessages } from '../apis/chat';
import chatSocket, {ChatSocket} from '../socket';


export interface Message {
  id: number;
  readUserCnt: number;
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
  const [isJoinEnd, setIsJoinEnd] = useState<boolean>(false);

  useEffect(() => {
    const receiveMsg = (msg: Message) => {
      if (!isSameChat(msg)) {
        notification(msg);
        return
      }
      socket.emitMessageCheck({
        chatId,
        userId: window.localStorage.getItem('userId') || '',
        toMessageId: msg.id
      });
      setMessage([...messages, msg]);
    }

    const checkMessage = (rangeMsg: [number, number]) => {
      // range[0] 보다 크고 ran
      console.log(rangeMsg);
      let index: number = -1;
      const tempMessage: Message[] = [...messages];
      let countingMessages: Message[] = tempMessage.filter((msg: Message, idx: number) => {
        const isOver = msg.id > rangeMsg[0];
        if (index === -1 && msg.id) index = idx;
        return isOver;
      })

      countingMessages = countingMessages.map((msg: Message) => {
        msg.readUserCnt += 1;
        return msg;
      });
      console.log(index);
      console.log(countingMessages);
      setMessage([...tempMessage.slice(0, index), ...countingMessages])
    }

    socket.onReceiveMessage(receiveMsg);
    socket.onMessageCheck(checkMessage); // TODO: 메시지가 누군가에게 읽혔다는 정보 수신 버그있음

    return () => {
      socket.offReceiveMessage(receiveMsg);
      socket.offMessageCheck(checkMessage);
    }
  }, [socket, messages]); 

  useEffect(() => {
    (async () => {
      const { data } = await getMessages(chatId, window.localStorage.getItem('userId') || '');
      setMessage(data);
    })();
  }, [chatId]);

  // useEffect(() => {
  //   if (!messages.length) return;
  //   console.log(messages, );
  //     // socket.emitMessageCheck({
  //     //   chatId,
  //     //   userId: window.localStorage.getItem('userId') || '',
  //     //   toMessageId: messages[messages.length - 1].id
  //     // });
  // }, [messages]);

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