import axiosInstance from "../config/axiosConfig";
import { ICreateUpdateProductVariant, IProductVariant } from "../types/types";
import { API_PRODUCT_VARIANTS_URL } from "../utils/consts";

export const getProductsVariants = async (): Promise<IProductVariant[] | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<IProductVariant[]>(`${API_PRODUCT_VARIANTS_URL}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener el stock de los productos en getProductsVariants: " + err,
        }
    }
}

export const postProductVariant = async (productVariant: ICreateUpdateProductVariant): Promise<IProductVariant | {error: string}> => {
    try {
        const {data} = await axiosInstance.post<IProductVariant>(`${API_PRODUCT_VARIANTS_URL}`, productVariant);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al crear el stock de los productos en postProductVariant: " + err,
        }
    }
}

export const putProductVariant = async (id: number, productVariant: ICreateUpdateProductVariant): Promise<IProductVariant | {error: string}> => {
    try {
        const {data} = await axiosInstance.put<IProductVariant>(`${API_PRODUCT_VARIANTS_URL}/${id}`, productVariant);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al actualizar el stock de los productos en putProductVariant: " + err,
        }
    }
}

export const deleteProductVariant = async (id: number): Promise<IProductVariant | {error: string}> => {
    try {
        const {data} = await axiosInstance.delete<IProductVariant>(`${API_PRODUCT_VARIANTS_URL}/${id}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al eliminar el stock de los productos en deleteProductVariant: " + err,
        }
    }
}