import axios from "axios";
import { axiosInstance } from "../config/axiosConfig";
import { ICreateUpdateProduct, IProduct } from "../types/types";
import { API_PRODUCTS_URL } from "../utils/consts";


export const getProducts = async (): Promise<IProduct[] | {error: string}> => {
    try {
        const {data} = await axios.get<IProduct[]>(`${API_PRODUCTS_URL}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener los productos en getProducts: " + err,
        }
    }
}

export const postProduct = async (product: ICreateUpdateProduct): Promise<IProduct | {error: string}> => {
    try {
        const {data} = await axiosInstance.post<IProduct>(`${API_PRODUCTS_URL}`, product);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al crear el producto en postProduct: " + err,
        }
    }
}

export const putProduct = async (id: number, product: ICreateUpdateProduct): Promise<IProduct | {error: string}> => {
    try {
        const {data} = await axiosInstance.put<IProduct>(`${API_PRODUCTS_URL}/${id}`, product);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al actualizar el producto en putProduct: " + err,
        }
    }
}

export const deleteProduct = async (id: number): Promise<IProduct | {error: string}> => {
    try {
        const {data} = await axiosInstance.delete<IProduct>(`${API_PRODUCTS_URL}/${id}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al eliminar el producto en deleteProduct: " + err,
        }
    }
}

export const getProductDeleted = async (): Promise<IProduct[] | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<IProduct[]>(`${API_PRODUCTS_URL}/deleted`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener los productos eliminados en getProductDeleted: " + err,
        }
    }
}

export const restoreProduct = async (id: number): Promise<IProduct | {error: string}> => {
    try {
        const {data} = await axiosInstance.put<IProduct>(`${API_PRODUCTS_URL}/deleted/${id}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al restaurar el producto en restoreProduct: " + err,
        }
    }
}