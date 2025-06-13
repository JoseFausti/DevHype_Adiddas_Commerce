import axiosInstance from "../config/axiosConfig";
import { IColor } from "../types/types"
import { API_COLORS_URL } from "../utils/consts"

export const getColors = async (): Promise<IColor[] | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<IColor[]>(`${API_COLORS_URL}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener las imagenes de los colores en getColors: " + err,
        }
    }
}

export const postColor = async (colorImg: Omit<IColor, 'id'>): Promise<IColor | {error: string}> => {
    try {
        const {data} = await axiosInstance.post<IColor>(`${API_COLORS_URL}`, colorImg);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al crear la imagen del color en postDetail: " + err,
        }
    }
}

export const putColor = async (id: number, colorImg: IColor): Promise<IColor | {error: string}> => {
    try {
        const {data} = await axiosInstance.put<IColor>(`${API_COLORS_URL}/${id}`, colorImg);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al actualizar la imagen del color en putColor: " + err,
        }
    }
}

export const deleteColor = async (id: number): Promise<IColor | {error: string}> => {
    try {
        const {data} = await axiosInstance.delete<IColor>(`${API_COLORS_URL}/${id}`);
        return data
    } catch (err) {
        return {
            error: "Se produjo un error al eliminar la imagen del color en deleteColor: " + err,
        }
    }
}