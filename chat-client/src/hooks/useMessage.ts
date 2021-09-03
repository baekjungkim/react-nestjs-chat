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

  useEffect(() => {
    const receiveMsg = (msg: Message) => {
      if (!isSameChat(msg)) {
        notification(msg);
        return
      }
      setMessage([...messages, msg]);
      socket.emitMessageCheck({
        chatId,
        checkerId: window.localStorage.getItem('userId') || '',
        toMessageId: msg.id
      });
    }

    const checkMessageInner = (rangeMsg: {checkMesssageRange: [number, number], checkerId: string}) => {
      if (rangeMsg.checkerId === window.localStorage.getItem('userId')) return;
      let index: number = -1;
      const tempMessage: Message[] = [...messages];
      let countingMessages: Message[] = tempMessage.filter((msg: Message, idx: number) => {
        const isOver = msg.id > rangeMsg.checkMesssageRange[0];
        if (index === -1 && isOver) index = idx;
        return isOver;
      })

      countingMessages = countingMessages.map((msg: Message) => {
        msg.readUserCnt += 1;
        return msg;
      });
      
      setMessage([...tempMessage.slice(0, index), ...countingMessages])
    }

    const checkMessageEnter = ({ checkMesssageRange, checkerId }: { checkMesssageRange: [number, number], checkerId: string }) => {
      if (checkerId === window.localStorage.getItem('userId')) return;
      checkMessageInner({ checkMesssageRange, checkerId })
    }

    socket.onReceiveMessage(receiveMsg);
    socket.onMessageCheckByInner(checkMessageInner); 
    socket.onMessageCheckMyEnter(checkMessageEnter);
    
    return () => {
      socket.offReceiveMessage(receiveMsg);
      socket.offMessageCheckByInner(checkMessageInner);
      socket.offMessageCheckMyEnter(checkMessageEnter);
    }
  }, [messages]); 

  useEffect(() => {
    (async () => {
      const userId = window.localStorage.getItem('userId');
      const { data } = await getMessages(chatId, userId || '');
      
      setMessage(data.messages);
      if (data.messages[data.messages.length - 1].id !== data.checkedLastMessageId) {
        const checkMesssageRange = [
          data.checkedLastMessageId,
          data.messages[data.messages.length - 1].id
        ]
        const payload = {
          chatId,
          checkMesssageRange,
          checkerId: userId
        }
        socket.emitMessageCheckRoomEnter(payload);
      }
    })();
    return () => {

    }
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