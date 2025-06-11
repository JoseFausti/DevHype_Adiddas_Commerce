import axiosInstance from "../config/axiosConfig";
import { ISize } from "../types/types";
import { API_SIZES_URL } from "../utils/consts";


export const getSizes = async (): Promise<ISize[] | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<ISize[]>(`${API_SIZES_URL}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener los talles en getSizes: " + err,
        }
    }
}

export const postSize = async (size: ISize): Promise<ISize | {error: string}> => {
    try {
        const {data} = await axiosInstance.post<ISize>(`${API_SIZES_URL}`, size);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al crear el talle en postSize: " + err,
        }
    }
}

export const putSize = async (id: number, size: ISize): Promise<ISize | {error: string}> => {
    try {
        const {data} = await axiosInstance.put<ISize>(`${API_SIZES_URL}/${id}`, size);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al actualizar el talle en putSize: " + err,
        }
    }
} 

export const deleteSize = async (id: number): Promise<ISize | {error: string}> => {
    try {
        const {data} = await axiosInstance.delete<ISize>(`${API_SIZES_URL}/${id}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al eliminar el talle en deleteSize: " + err,
        }
    }
}