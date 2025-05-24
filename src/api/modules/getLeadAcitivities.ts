 import axiosInstance from '../api';

// Define the interface for lead activity data
export interface LeadActivityes {
  id: string | number;
  leadId: string | number;
  activityType: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  // Add other properties based on your actual data structure
}

// API response interface
interface ApiResponse {
  data: LeadActivityes[];
  message?: string;
  status?: string;
}

export const getLeadActivities = async (leadId: number): Promise<LeadActivityes[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse>(`/api/lead-activity/${leadId}`);
    console.log("get activities lead===============>", response);
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Error fetching lead activities:', error);
    throw error;
  }
};

//  import axiosInstance from '../api';

// export interface CallLog {
//   id: number;
//   lead_id: number;
//   user_id: number;
//   user: {
//     id: number;
//     name: string;
//     avatar?: string;
//   };
//   status: string;
//   note: string;
//   follow_up_date: string;
//   created_at: string;
// }

// // Fix the return type: Promise<CallLog[]>
// export const getCallLogData = async (leadId: number): Promise<CallLog[]> => {
//   try {
//     const response = await axiosInstance.get(`/api/call-logs/lead/${leadId}`);
//     return response.data.logs || [];
//   } catch (error) {
//     console.error('Error fetching call logs:', error);
//     throw error;
//   }
// };