import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-url.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;  

// import axios from 'axios';
// import { base_path } from '../environment';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   withCredentials: true, // ✅ absolutely required
// });

// export default api;
