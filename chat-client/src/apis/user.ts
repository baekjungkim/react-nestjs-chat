import axios from 'axios';

export const getUsers = async (userId: string) => {
  return await axios.get(`${process.env.REACT_APP_HTTP_API}/user`, {
    params: {
      userId
    }
  })
}