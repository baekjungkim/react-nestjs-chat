import { useState, useEffect } from 'react';
import _ from 'lodash';
import { getChats } from '../apis/chat';
import { selectPickAndFirstInsert } from '../utils/arr';

import chatSocket, {ChatSocket} from '../socket';

// joinChat 데이터느 flat 형태
export interface Chat {
  id: number;
  name: string;
  password: string;
  createdAt: Date;
  msg: string;
  msgType: string;
}

export interface User {
  id: number;
  name: string;
  profileImage: string;
}

export interface JoinChat {
  id: number;
  notReadMsgCnt: number;
  createdAt: Date;
  chat: Chat;
}

const useChats = (userId: number) => {
  const [socket] = useState<ChatSocket>(chatSocket);
  const [chats, _setChats] = useState<JoinChat[]>([]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const {data} = await getChats(userId);
      _setChats(data);
    })();
  }, [userId]);

  useEffect(() => {
    if (!socket) return;

    const onChatJoined = (data: { chat: Chat }) => {
      _setChats([
        ...chats,
        { id: -1, chat: data.chat, createdAt: new Date(), notReadMsgCnt: 0 }
      ]);
    }
  
    const onReceiveMessage = (message: any) => {
      const chatId = message.chat.id;
      const cloneChat:JoinChat [] = _.cloneDeep(chats);
      const chatIdx = cloneChat.findIndex(chat => chat.chat.id === chatId);
  
      cloneChat[chatIdx].chat.msg = message.msg;
      cloneChat[chatIdx].chat.msgType = message.msgType;
      cloneChat[chatIdx].notReadMsgCnt += 1;
      
      _setChats(selectPickAndFirstInsert(cloneChat, chatIdx));
    }

    socket.onChatJoined(onChatJoined);
    socket.onReceiveMessage(onReceiveMessage);

    return () => {
      socket.offChatJoined(onChatJoined);
      socket.offReceiveMessage(onReceiveMessage);
    }
  }, [chats, socket])

  return { chats }
}

export default useChats;