import {getProductsVariants, postProductVariant, putProductVariant, deleteProductVariant} from "../http/product_variants";
import {IProductVariant, IHttpResponse, ICreateUpdateProductVariant} from "../types/types";

export const getAllProductVariants = async (): Promise<IHttpResponse<IProductVariant[]>> => {
    try {
        const productVariants = await getProductsVariants();
        if ('error' in productVariants) {
            return {
                data: [],
                error: productVariants.error,
                status: 404
            };
        }
        return {
            data: productVariants,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: [],
            error: "Se produjo un error en getAllProductVariants: " + error,
            status: 500
        };
    }
}

export const findProductVariantById = async(id: number): Promise<IHttpResponse<IProductVariant | null>> => {
    try {
        const productVariants = await getProductsVariants();
        if ('error' in productVariants) {
            return {
                data: null,
                error: productVariants.error,
                status: 500
            };
        }
        const productVariant = productVariants.find(p => p.id === id);
        if (!productVariant) {
            return {
                data: null,
                error: "No se encontró el stock del producto asociado",
                status: 404
            };
        }
        return {
            data: productVariant,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en findProductVariantById: " + error,
            status: 500
        };
    }
}

export const createProductVariant = async(newProductVariant: ICreateUpdateProductVariant): Promise<IHttpResponse<IProductVariant | null>> => {
    try {
        const productVariant = await postProductVariant(newProductVariant);
        if ('error' in productVariant) {
            return {
                data: null,
                error: productVariant.error,
                status: 500
            };
        }
        return {
            data: productVariant,
            error: "",
            status: 201
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en createProductVariant: " + error,
            status: 500
        };
    }
}

export const updateProductVariant = async(id: number, updatedProductVariant: ICreateUpdateProductVariant): Promise<IHttpResponse<IProductVariant | null>> => {
    try {
        const productVariant = await putProductVariant(id, updatedProductVariant);
        if ('error' in productVariant) {
            return {
                data: null,
                error: productVariant.error,
                status: 500
            };
        }
        return {
            data: productVariant,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en updateProductVariant: " + error,
            status: 500
        };
    }
}

export const deleteProductVariantById = async(id: number): Promise<IHttpResponse<IProductVariant | null>> => {
    try {
        const productVariant = await deleteProductVariant(id);
        if ('error' in productVariant) {
            return {
                data: null,
                error: productVariant.error,
                status: 500
            };
        }
        return {
            data: productVariant,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en deleteProductVariantById: " + error,
            status: 500
        };
    }
}