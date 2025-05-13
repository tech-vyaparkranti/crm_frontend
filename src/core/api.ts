import axios from 'axios';
import { base_path } from '../environment';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true, // ✅ absolutely required
});

export default api;