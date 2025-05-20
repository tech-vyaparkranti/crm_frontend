 import axiosInstance from '../api';

export interface CallLog {
  id: number;
  lead_id: number;
  user_id: number;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
  status: string;
  note: string;
  follow_up_date: string;
  created_at: string;
}

// Fix the return type: Promise<CallLog[]>
export const getCallLogData = async (leadId: number): Promise<CallLog[]> => {
  try {
    const response = await axiosInstance.get(`/api/call-logs/lead/${leadId}`);
    return response.data.logs || [];
  } catch (error) {
    console.error('Error fetching call logs:', error);
    throw error;
  }
};