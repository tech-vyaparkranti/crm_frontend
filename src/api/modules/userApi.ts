import axiosInstance from '../axiosInstance';
import endpoints from '../endpoints';

// ✅ Define a type or interface for user data
export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}


