import { useState, useEffect } from 'react';
import { createChat } from '../apis/chat';
import { getUsers, getUser } from '../apis/user';

const useUser = () => {
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

  const onSelectHandler = (idx: number) => {
    setSelect({...select, [idx]: !select[idx]})
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
    await createChat(payload);

    // TODO: 생성된 채팅방 chatId를 소켓에 던져주어서 해당 채팅방 user들을 join한다
    
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