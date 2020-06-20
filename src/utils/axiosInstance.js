import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://softcamp-api.herokuapp.com/api/v1',
});

export default instance;
