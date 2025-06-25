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

// No seteamos el header de la peticion para subir imagenes ya que axios 
// lo maneja automaticamente cuando usamos FormData
const axiosInstanceFile = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

axiosInstanceFile.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}
, (error) => {
    return Promise.reject(error);
});

export { axiosInstance, axiosInstanceFile };