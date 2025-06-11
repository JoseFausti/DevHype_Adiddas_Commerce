import axiosInstance from "../config/axiosConfig";
import { IDirection } from "../types/types";
import { API_DIRECTIONS_URL } from "../utils/consts";

export const getDirections = async(): Promise<IDirection[] | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<IDirection[]>(`${API_DIRECTIONS_URL}`);
        return data
    } catch (err) {
        return {
            error: "Se produjo un error al obtener las direcciones en getDirections: " + err,
        }
    }
}

export const postDirection = async (direction: IDirection): Promise<IDirection | {error: string}> => {
    try {
        const {data} = await axiosInstance.post<IDirection>(`${API_DIRECTIONS_URL}`, direction);
        return data
    } catch (err) {
        return {
            error: "Se produjo un error al crear la direccion en postDirection: " + err,
        }
    }
}

export const putDirection = async (id: number, direction: IDirection): Promise<IDirection | {error: string}> => {
    try {
        const {data} = await axiosInstance.put<IDirection>(`${API_DIRECTIONS_URL}/${id}`, direction);
        return data
    } catch (err) {
        return{
            error: "Se produjo un error al actualizar la direccion en putDirection: " + err,
        }
    }
}

export const deleteDirection = async (id: number): Promise<IDirection | {error: string}> => {
    try {
        const {data} = await axiosInstance.delete<IDirection>(`${API_DIRECTIONS_URL}/${id}`);
        return data
    } catch (err) {
        return {
            error: "Se produjo un error al eliminar la direccion en deleteDirection: " + err,
        }
    }
}