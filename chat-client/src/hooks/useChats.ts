import { useState, useEffect } from 'react';
import { getChats } from '../apis/chat';

// joinChat 데이터느 flat 형태
export interface Chat {
  id: number;
  name: string;
  password: string;
  createdAt: Date;
}

export interface Message {
  id: number;
  chatId: number;
  msg: string;
  msgType: string
}

export interface User {
  id: number;
  name: string;
  profileImage: string;
}

export interface JoinChat {
  id: number;
  chatId: number;
  msgUserId: number; // 메시지 송신자 유저 아이디
  chatName: string;
  chatPassword: string;
  msg: string;
  msgType: string;
  chatCreatedAt: Date;
  msgCreatedAt: Date;
}

const useChats = (userId: number) => {
  const [chats, setChats] = useState<JoinChat[]>([]);

  useEffect(() => {
    // TODO: 메시지 수신 이벤트 mount, unmount
  }, [])

  useEffect(() => {
    (async () => {
      const {data} = await getChats(userId);
      setChats(data);
    })();
  }, [userId]);

  const onReceiveMessage = (message: Chat) => {

  }

  return { chats, onReceiveMessage }
}

export default useChats;