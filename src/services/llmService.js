import axios from "axios";

export const requestAccountInformation = async (payload) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_GEMINI_API}/acc-info`, payload, {withCredentials: true})
        return response.data;
    } catch (error) {
        console.error(error)
        return response.message;
    }
}

export const uploadFile = async (payload) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_GEMINI_API}/upload`, payload, {withCredentials: true})
        return response.data;
    } catch (error) {
        console.error(error);
        return response.message
    }
}