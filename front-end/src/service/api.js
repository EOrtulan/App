import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const login = async (email, password) => {
  const response = await api({
    method: 'POST',
    url: '/login',
    data: {
      email,
      password,
    },
  });
  return response.data;
};

export const register = async (user, email, password) => {
  const response = await api({
    method: 'POST',
    url: '/register',
    data: {
      user,
      email,
      password,
    },
  });
  return response;
};
