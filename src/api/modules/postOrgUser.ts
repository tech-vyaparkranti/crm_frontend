import api from "../api"

export const postOrgUser = async (data:FormData) => {
    try {
        const response = await api.post('/api/org-user-save')
        console.log(response.data);
        return response;
    } catch (error) {
        console.log(error,'eee');
        return error;
    }
}