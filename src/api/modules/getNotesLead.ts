 import axiosInstance from '../api';

export interface NotesLog {
 id: number;
  lead_id: number;
  title: string;
  notes_description: string;
  file_path?: string | null;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
}

export const getNotesLead = async (leadId: number): Promise<NotesLog[]> => {
  try {
    const response = await axiosInstance.get(`/api/lead-notes/lead/${leadId}`);
    return response.data.notes || [];
  } catch (error) {
    console.error('Error fetching lead notes:', error);
    throw error;
  }
};
