import { axiosInstance } from "../config/axiosConfig";
import { ICreateType, IType } from "../types/types";
import { API_TYPES_URL } from "../utils/consts";


export const getTypes = async (): Promise<IType[] | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<IType[]>(`${API_TYPES_URL}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener los tipos en getTypes: " + err,
        }
    }
}

export const postType = async (type: ICreateType): Promise<IType | {error: string}> => {
    try {
        const {data} = await axiosInstance.post<IType>(`${API_TYPES_URL}`, type);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al crear el tipo en postType: " + err,
        }
    }
}

export const putType = async (id: number, type: IType): Promise<IType | {error: string}> => {
    try {
        const {data} = await axiosInstance.put<IType>(`${API_TYPES_URL}/${id}`, type);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al actualizar el tipo en putType: " + err,
        }
    }
}

export const deleteType = async (id: number): Promise<IType | {error: string}> => {
    try {
        const {data} = await axiosInstance.delete<IType>(`${API_TYPES_URL}/${id}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al eliminar el tipo en deleteType: " + err,
        }
    }
}

export const getByCategoryId = async (id: number): Promise<IType[] | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<IType[]>(`${API_TYPES_URL}/category/${id}`);
        return data;
    } catch (error) {
        return {
            error: "Se produjo un error al obtener los tipos por categoria en getByCategoryId: " + error,
        }
    }
}

export const restoreType = async (id: number): Promise<IType | {error: string}> => {
    try {
        const {data} = await axiosInstance.put<IType>(`${API_TYPES_URL}/deleted/${id}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al restaurar el producto en restoreType: " + err,
        }
    }
}