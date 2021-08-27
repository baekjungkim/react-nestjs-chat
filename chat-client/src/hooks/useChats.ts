import { useState, useEffect } from 'react';
import { getChats } from '../apis/chat';

export interface Chat {

}

const useChats = (userId: number) => {
  const [chats, setChats] = useState<Chat[]>([]);

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