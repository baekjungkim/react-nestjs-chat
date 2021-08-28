import { useState, useEffect } from 'react';
import { createChat } from '../apis/chat';
import { getUsers } from '../apis/user';

const useUser = () => {
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState<any>({});
  useEffect(() => {
    (async () => {
      const { data } = await getUsers(
        window.localStorage.getItem('userId') || ''
      );
      setUsers(data);
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
    const data = await createChat(payload);
    
  }

  return {
    users,
    select,
    onSelectHandler,
    onSubmitHandler
  };
};

export default useUser;