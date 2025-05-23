// Creamos un interceptor de axios para setear el token en el header de las peticiones
import axios from "axios";
import Cookies from "js-cookie";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}
, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;