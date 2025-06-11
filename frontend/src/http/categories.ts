import axiosInstance from "../config/axiosConfig";
import { ICategory } from "../types/types";
import { API_CATEGORIES_URL } from "../utils/consts";

export const getCategories = async (): Promise<ICategory[] | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<ICategory[]>(`${API_CATEGORIES_URL}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener las categorias en getCategories: " + err,
        }
    }
}

export const postCategory = async (category: ICategory): Promise<ICategory | {error: string}> => {
    try {
        const {data} = await axiosInstance.post<ICategory>(`${API_CATEGORIES_URL}`, category);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al crear la categoria en postCategory: " + err,
        }
    }
}

export const putCategory = async (id: number, category: ICategory): Promise<ICategory | {error: string}> => {
    try {
        const {data} = await axiosInstance.put<ICategory>(`${API_CATEGORIES_URL}/${id}`, category);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al actualizar la categoria en putCategory: " + err,
        }
    }
}

export const deleteCategory = async (id: number): Promise<ICategory | {error: string}> => {
    try {
        const {data} = await axiosInstance.delete<ICategory>(`${API_CATEGORIES_URL}/${id}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al eliminar la categoria en deleteCategory: " + err,
        }
    }
}