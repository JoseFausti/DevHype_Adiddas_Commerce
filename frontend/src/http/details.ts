import { axiosInstance } from "../config/axiosConfig";
import { ICreateUpdateDetail, IDetail } from "../types/types"
import { API_DETAILS_URL } from "../utils/consts"

export const getDetails = async (): Promise<IDetail[] | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<IDetail[]>(`${API_DETAILS_URL}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener los detalles en getDetails: " + err,
        }
    }
}

export const postDetail = async (detail: ICreateUpdateDetail): Promise<IDetail | {error: string}> => {
    try {
        const {data} = await axiosInstance.post<IDetail>(`${API_DETAILS_URL}`, detail);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al crear el detalle en postDetail: " + err,
        }
    }
}

export const putDetail = async (id: number, detail: ICreateUpdateDetail): Promise<IDetail | {error: string}> => {
    try {
        const {data} = await axiosInstance.put<IDetail>(`${API_DETAILS_URL}/${id}`, detail);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al actualizar el detalle en putDetail: " + err,
        }
    }
}

export const deleteDetail = async (id: number): Promise<IDetail | {error: string}> => {
    try {
        const {data} = await axiosInstance.delete<IDetail>(`${API_DETAILS_URL}/${id}`);
        return data
    } catch (err) {
        return {
            error: "Se produjo un error al eliminar el detalle en deleteDetail: " + err,
        }
    }
}