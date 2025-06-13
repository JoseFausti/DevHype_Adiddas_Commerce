import axiosInstance from "../config/axiosConfig";
import { ICreateUpdatePurchaseOrder, IPurchaseOrder } from "../types/types";
import { API_PURCHASE_ORDERS_URL, API_PURCHASE_ORDER_MP_URL } from "../utils/consts";


export const getPurchaseOrders = async (): Promise<IPurchaseOrder[] | {error: string}> => {
    try {
        const {data} = await axiosInstance.get<IPurchaseOrder[]>(`${API_PURCHASE_ORDERS_URL}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al obtener los productos en getPurchaseOrders: " + err,
        }
    }
}

export const postPurchaseOrder = async (purchase_order: ICreateUpdatePurchaseOrder): Promise<IPurchaseOrder & {initPoint: string} | {error: string}> => {
    try {
        const {data} = await axiosInstance.post<IPurchaseOrder & {initPoint: string}>(`${API_PURCHASE_ORDER_MP_URL}`, purchase_order);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al crear el producto en postPurchaseOrder: " + err,
        }
    }
}

export const putPurchaseOrder = async (id: number, purchase_order: ICreateUpdatePurchaseOrder): Promise<IPurchaseOrder | {error: string}> => {
    try {
        const {data} = await axiosInstance.put<IPurchaseOrder>(`${API_PURCHASE_ORDERS_URL}/${id}`, purchase_order);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al actualizar el producto en putPurchaseOrder: " + err,
        }
    }
}

export const deletePurchaseOrder = async (id: number): Promise<IPurchaseOrder | {error: string}> => {
    try {
        const {data} = await axiosInstance.delete<IPurchaseOrder>(`${API_PURCHASE_ORDERS_URL}/${id}`);
        return data;
    } catch (err) {
        return {
            error: "Se produjo un error al eliminar el producto en deletePurchaseOrder: " + err,
        }
    }
}