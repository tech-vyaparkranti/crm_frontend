import api from "../../api"

export const deleteOrgUser =  async (id:any )  => 
{
    try {
        const response = await api.post(`/api/org-user-delete/${id}`)
        return response;
    } catch (error : any) {
         if (error.response?.status === 422) {
      const message = error.response.data.message || 'Validation failed';
      const errors: Record<string, string[]> = error.response.data.errors;
      const firstError: string = Object.values(errors)[0][0];
      return {
        success: false,
        type: 'validation',
        message,
        firstError,
        errors
      };
    }

    return {
      success: false,
      type: 'unknown',
      message: 'Something went wrong. Please try again.',
      error
    };
    }
}