import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const login = async (email, password) => {
  const response = await api.post('/login', email, password);
  return response.data;
};

export default login;
