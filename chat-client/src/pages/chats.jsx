import {
  ConversationList,
  Conversation,
  Avatar
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css' ;

import Fab from '../components/fab';

import useChats from '../hooks/useChats';
import { DEFAULT_IMAGE } from '../utils/constant';

const Chats = (props) => {
  if(!window.localStorage.getItem('userId')) props.history.replace('/');
  const { chats } = useChats(window.localStorage.getItem('userId'));
  
  return (
    <div style={{
      height: "100%"
    }}>
      <ConversationList>
        {chats.map(chat => (
          <Conversation 
            key={chat.chat.id}
            name={chat.chat.name} 
            info={chat.chat.msg || '채팅내용이 없습니다.'}
            onClick={() => props.history.push(`/chat/${chat.chat.id}`, chat.chat)}
            // unreadCnt={12} // noti
          >
            <Avatar src={DEFAULT_IMAGE} name="Lilly" />
            <Conversation.Operations onClick={e => {e.stopPropagation(); console.log(123)}}/>   
          </Conversation>
        ))}
      </ConversationList>

      <Fab {...props}/>
    </div>
  );
};

export default Chats;
