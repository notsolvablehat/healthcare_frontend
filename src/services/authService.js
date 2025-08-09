import axios from "axios";

export const login = async (payload) => {
    const {emailId, password} = payload;
    try {

        const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/login`, {emailId, password}, {withCredentials: true});
        return response.data;

    } catch (error) {

        console.log(error);
        return response.data;

    }
}

export const getMe = async () => {
    try {

        const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/me`, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
        return response.data;

    }
}


export const logout = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/logout`,{} ,{withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
        return response.data;
    }
}