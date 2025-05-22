import axiosInstance from '../api';

 

// Post new call log
export const postLeadStatus = async (data: {
  id: number;
  status: string;
  action: string;
}) => {
  try {
    const response = await axiosInstance.post('/api/lead-save', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

