import axios from 'axios';

const api = axios.create({
  baseURL: 'http://www.angelelli.com.br:3333',
  // 'https://cors-anywhere.herokuapp.com/'+
});

export default api;
