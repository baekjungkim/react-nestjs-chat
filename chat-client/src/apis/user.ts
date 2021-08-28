import axios from 'axios';

export const getUsers = async (userId: string) => {
  return await axios.get(`${process.env.REACT_APP_HTTP_API}/user`, {
    params: {
      userId
    }
  })
}

export const getUser = async (userId: string) => {
  return await axios.get(`${process.env.REACT_APP_HTTP_API}/user/${userId}/detail`, {
    params: {
      userId
    }
  })
}