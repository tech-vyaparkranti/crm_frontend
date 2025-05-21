import axiosInstance from '../api';

// Define interface that matches the server response
// interface NotesLeadData {
//   lead_id: string | number;
//   title: string;
//   notes_description: string;
//   file_path?: File ;
// }

// Post new notes lead - modified to accept FormData for file uploads
export const postNotesLead = async (data: FormData) => {
  try {
    const response = await axiosInstance.post('/api/lead-notes', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
