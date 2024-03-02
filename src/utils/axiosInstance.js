import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://softcamp-backend.onrender.com/api/v1',
});

export default instance;
