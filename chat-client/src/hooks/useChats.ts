import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { reduceEachTrailingCommentRange } from 'typescript';
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
  const [socket, setSocket] = useState<Socket>();
  const [chats, setChats] = useState<JoinChat[]>([]);

  useEffect(() => {
    // TODO: 메시지 수신 이벤트 mount, unmount
    // TODO: 채팅방 생성 수신
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
  }, [])

  useEffect(() => {
    if (!socket) return;

    socket.on('chat-joined', (data: {chat: Chat}) => {
      setChats([
        ...chats,
        { id: -1, chat: data.chat, createdAt: new Date() }
      ]);
    })
  }, [socket])

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