import axios from 'axios';

const API = axios.create({
  baseURL: 'https://rattler-secure-flounder.ngrok-free.app'
});

export default API;