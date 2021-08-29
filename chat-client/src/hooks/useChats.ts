import { useState, useEffect } from 'react';
import { getChats } from '../apis/chat';

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
  createdAt: Date;
  chat: Chat;
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