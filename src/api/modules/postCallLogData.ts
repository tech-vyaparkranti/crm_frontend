import axiosInstance from '../api';

// Get call logs
// export const getCallLogs = async (params = {}) => {
//   try {
//     const response = await axiosInstance.get('/call-logs', { params });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching call logs:', error);
//     throw error;
//   }
// };

// Post new call log
export const postCallLog = async (data: {
  lead_id: number;
  status: string;
  follow_up_date: string;
  note?: string;
}) => {
  try {
    const response = await axiosInstance.post('/api/call-logs', data);
      
    return response.data;
  } catch (error) {
    throw error;
  }
};



