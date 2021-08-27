import axios from 'axios';

export async function getChats(userId: number) {
  return await axios.get(`${process.env.REACT_APP_HTTP_API}/chat`, {
    params: {
      userId,
    },
  });
}

export async function getMessages(chatId: number) {
  return await axios.get(`${process.env.REACT_APP_HTTP_API}/chat/${chatId}`);
}
