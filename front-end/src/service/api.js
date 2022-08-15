import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const login = async (email, password) => {
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

export const getProducts = async () => {
  const response = await api({
    method: 'GET',
    url: '/products',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getOrdersId = async (id) => {
  const response = await api({
    method: 'GET',
    url: `/orders/${id}`,
  });
  return response.data;
};

export default login;
