import axios from 'axios';

const api = axios.create({
  baseURL: 'https://187.9.38.146:3333',
});

export default api;
