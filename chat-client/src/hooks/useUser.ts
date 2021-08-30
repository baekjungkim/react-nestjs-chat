import { useState, useEffect } from 'react';
import { createChat } from '../apis/chat';
import { getUsers, getUser } from '../apis/user';

// import { io, Socket } from 'socket.io-client';
import chatSocket, {ChatSocket} from '../socket';

const useUser = () => {
  const [socket] = useState<ChatSocket>(chatSocket);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [select, setSelect] = useState<any>({});
  
  useEffect(() => {
    (async () => {
      const { data: users } = await getUsers(
        window.localStorage.getItem('userId') || ''
      );
      const { data: user } = await getUser(
        window.localStorage.getItem('userId') || ''
      );
      setUsers(users);
      setUser(user);
    })();
  }, []);

  useEffect(() => {
    if (!socket) return;
  }, [socket])

  const onSelectHandler = (userId: number) => {
    setSelect({...select, [userId]: !select[userId]})
  }

  const onSubmitHandler = async () => {
    const joinIds = Object.keys(select)
      .filter(key => select[key])
      .map(key => parseInt(key));
    const payload = {
      userId: window.localStorage.getItem('userId'),
      joinIds,
      name: new Date().getTime(),
      password: 'password'
    }
    const { data } = await createChat(payload);
    socket.emitChatJoined({
      chat: data.chat,
      joinIds,
    })    
  }

  return {
    users,
    select,
    user,
    onSelectHandler,
    onSubmitHandler
  };
};

export default useUser;