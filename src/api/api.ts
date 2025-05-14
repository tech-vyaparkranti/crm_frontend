import axios from 'axios';
import { base_path } from '../environment';

const api = axios.create({
  // baseURL: 'http://192.168.1.9:8000',
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,  
});

export default api;