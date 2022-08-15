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

export const getSellers = async () => {
  const response = await api({
    method: 'GET',
    url: '/seller',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const saleRegister = async (sale) => {
  const response = await api({
    method: 'POST',
    url: '/customer/checkout',
    data: sale,
  });
  return response;
};

export const getOrders = async () => {
  const response = await api({
    method: 'GET',
    url: '/orders',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default login;
