import axios from 'axios';

export const api = axios.create({
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

export const register = async (name, email, password) => {
  const response = await api({
    method: 'POST',
    url: '/register',
    data: {
      name,
      email,
      password,
    },
  });
  return response.data;
};
