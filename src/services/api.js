import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/'+'http://www.angelelli.com.br:3333',
});

export default api;
