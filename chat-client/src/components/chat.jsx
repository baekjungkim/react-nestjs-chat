import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import useMessage from '../hooks/useMessage';

const Chat = () => {
  const userId = 1;
  const {messages, sendMessage} = useMessage(1);
  const onSendHandler = (message) => {
    sendMessage({message, userId: getRandomArbitrary(1, 4)});
  }

  function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }

  return (
    <div style={{ position: "relative", height: 500 }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((message, index) => (
              <Message
                key={index}
                model={{
                  message: message.message,
                  sentTime: "just now",
                  sender: "Joe",
                  direction: userId === message.userId ? "outgoing": "incoming",
                }}
              />
            ))}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={onSendHandler}/>
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default Chat;