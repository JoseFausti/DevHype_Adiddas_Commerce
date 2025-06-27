import { axiosInstance } from "../config/axiosConfig";
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

export const getTypeDeletedInCategory = async (): Promise<ICategory[] | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<ICategory[]>(`${API_CATEGORIES_URL}/deleted`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener los productos eliminados en getTypeDeletedInCategory: " + err,
        }
    }
}

export const getCategoriesWithDeletedTypes = async (): Promise<ICategory[] | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<ICategory[]>(`${API_CATEGORIES_URL}/deletedTypes`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener las categorias con tipos eliminados en getCategoriesWithDeletedTypes: " + err,
        }
    }
}

export const postCategory = async (category: Omit<ICategory, 'id'>): Promise<ICategory | {error: string}> => {
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

export const getCategoryByName = async (name: string): Promise<ICategory | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<ICategory>(`${API_CATEGORIES_URL}/name/${name}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener la categoria en getCategoryByName: " + err,
        }
    }
}