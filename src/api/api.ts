import axios from 'axios';
import { base_path } from '../environment';

const api = axios.create({
  // baseURL: 'http://192.168.1.9:8000',
  baseURL: 'http://192.168.1.14:8000',
  withCredentials: true,  
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log(token ,'token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;