import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import _ from 'lodash';
import { getChats } from '../apis/chat';
import { selectPickAndFirstInsert } from '../utils/arr';

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
  const [socket, setSocket] = useState<Socket>();
  const [chats, setChats] = useState<JoinChat[]>([]);

  useEffect(() => {
    // TODO: 메시지 수신 이벤트 mount, unmount
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
    if (!socket || !userId) return;
    (async () => {
      const {data} = await getChats(userId);
      setChats(data);
    })();
  }, [userId, socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('chat-joined', onChatJoined)
    socket.on('message', onReceiveMessage)

    return () => {
      socket.off('chat-joined', onChatJoined)
      socket.off('message', onReceiveMessage)
    }
  }, [chats])

  const onChatJoined = (data: {chat: Chat}) => {
    setChats([
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
    
    setChats(selectPickAndFirstInsert(cloneChat, chatIdx));
  }

  return { chats, onReceiveMessage }
}

export default useChats;