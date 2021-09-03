import {
  Conversation,
  Avatar,
  ConversationList,
  ConversationHeader
} from '@chatscope/chat-ui-kit-react';

import { DEFAULT_IMAGE } from '../../utils/constant';
import useUser from '../../hooks/useUser'

import Button from '../../components/button';

const MakeChat = (props) => {
  const { user, users, onSelectHandler, select, onSubmitHandler } = useUser();
  
  const onCreateHandler = async () => {
    await onSubmitHandler()
    // TODO: props.history.push는 정상동작하지 않음
    props.history.replace('/chats');
    // window.location.href = '/chats'
  }

  const headerHeight = 63;
  const footerBottom = 50;
  const usersHeight = window.innerHeight - headerHeight - footerBottom;

  return (
    <>
      <ConversationHeader>
          <ConversationHeader.Back onClick={() => props.history.goBack()}/>
          <Avatar src={user.profileImage || DEFAULT_IMAGE} name={user.name} />
          <ConversationHeader.Content userName={user.name} info="멍개~" />
      </ConversationHeader>
      <div style={{
        height: usersHeight
      }}>
        <ConversationList>
          {users.map((user, index) => (
            <Conversation name={user.name} info="message" unreadDot={select[user.id]} onClick={() => onSelectHandler(user.id)}>
              <Avatar src={user.profileImage || DEFAULT_IMAGE} name={user.name} />
            </Conversation>
          ))}
        </ConversationList>
      </div>
      <Button 
        onClick={onCreateHandler} 
        style={{height: footerBottom, width: '100%'}}
      />
    </>
  );
}

export default MakeChat;