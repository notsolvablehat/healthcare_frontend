import axios from "axios";

export const updateData = (payload) => {
    try {
        console.log(payload)
        const response = axios.put(`${import.meta.env.VITE_BASE_API_URL}/update-profile`, payload, {withCredentials: true});
        if(response)
            return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}