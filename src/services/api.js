import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/http://187.9.38.146:3333',
  // 'https://cors-anywhere.herokuapp.com/'+
});

export default api;
