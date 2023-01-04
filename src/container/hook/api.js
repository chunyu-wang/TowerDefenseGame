import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://wpfinal-backend.onrender.com/',
});

export default instance;

