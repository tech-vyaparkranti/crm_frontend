import api from "../../api"

export const OrgUser = async (page : any) => {
    try {
        const response = await api.get(`/api/org-user-data?page=${page}`);        
        return response.data.user;
    } catch (error) {
        alert(error);
        throw error;
    }
}