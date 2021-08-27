import {
  ConversationList,
  Conversation,
  Avatar
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css' ;

import useChats from '../hooks/useChats';

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
            key={chat.id}
            name={chat.chat.name} 
            lastSenderName={chat.chat.id.toString()} 
            info={chat.chat.createdAt}
            onClick={() => props.history.push(`/chat/${chat.chat.id}`)}
          >
            <Avatar src={'https://lh3.googleusercontent.com/ogw/ADea4I7GOM3jFhU3s4x6-QoqDxPVZRwdSK0aV6Qy3DO7=s32-c-mo'} name="Lilly" />
          </Conversation>
        ))}
      </ConversationList>
    </div>
  );
};

export default Chats;
