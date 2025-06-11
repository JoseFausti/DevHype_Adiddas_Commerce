import axios from "axios";
import axiosInstance from "../config/axiosConfig";
import { IUser } from "../types/types";
import { API_AUTH_URL, API_USERS_URL } from "../utils/consts";


export const getUsers = async (): Promise<IUser[] | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<IUser[]>(`${API_USERS_URL}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener los usuarios en getUsers: " + err,
        }
    }
}

export const postUser = async (user: IUser): Promise<IUser | {error: string}> => {
    try {
        const {data} = await axiosInstance.post<IUser>(`${API_USERS_URL}`, user);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al crear el usuario en postUser: " + err,
        }
    }
}

export const putUser = async (id: string, user: IUser): Promise<IUser | {error: string}> => {
    try {
        const {data} = await axiosInstance.put<IUser>(`${API_USERS_URL}/${id}`, user);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al actualizar el usuario en putUser: " + err,
        }
    }
}

export const deleteUser = async (id: string): Promise<IUser | {error: string}> => {
    try {
        const {data} = await axiosInstance.delete<IUser>(`${API_USERS_URL}/${id}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al eliminar el usuario en deleteUser: " + err,
        }
    }
}

export const login = async (username: string, password: string): Promise<{token: string} | {error: string}> => {
    try {
        const {data} = await axios.post(`${API_AUTH_URL}/login`, {username, password});
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al iniciar sesión en login: " + err,
        }
    }
}

export const register = async (user: Omit<IUser, 'id' | 'deleted' | 'role' | 'address' | 'directions' | 'purchaseOrders'>): Promise<{token: string} | {error: string}> => {
    try {
        const {data} = await axios.post(`${API_AUTH_URL}/register`, user);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al registrar el usuario en register: " + err,
        }
    }
        
}

export const getUserByUsername = async (username: string): Promise<IUser | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<IUser>(`${API_USERS_URL}/username`, {params: {username}});
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener el usuario por nombre de usuario en getUserByUsername: " + err,
        }
    }
}