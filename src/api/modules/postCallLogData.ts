import axiosInstance from '../api';

 

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

export const postEditCallLog = async (data: {
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



