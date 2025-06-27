import { deleteCategory, getCategories, getCategoriesWithDeletedTypes, getCategoryByName, getTypeDeletedInCategory, postCategory, putCategory } from "../http/categories";
import { ICategory, IHttpResponse } from "../types/types";

export const getAllCategories = async (): Promise<IHttpResponse<ICategory[]>> => {
    try {
        const categories = await getCategories();
        if ('error' in categories) {
            return {
                data: [],
                error: categories.error,
                status: 404
            };
        }
        return {
            data: categories,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: [],
            error: "Se produjo un error en getAllCategories: " + error,
            status: 500
        };
    }
}

export const getAllCategoriesWithDeletedTypes = async (): Promise<IHttpResponse<ICategory[]>> => {
    try {
        const categories = await getCategoriesWithDeletedTypes();
        if ('error' in categories) {
            return {
                data: [],
                error: categories.error,
                status: 404
            };
        }
        return {
            data: categories,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: [],
            error: "Se produjo un error en getAllCategoriesWithDeletedTypes: " + error,
            status: 500
        };
    }
}

export const findCategoryById = async(id: number): Promise<IHttpResponse<ICategory | null>> => {
    try {
        const categories = await getCategories();
        if('error' in categories){
            return{
                data: null,
                error: categories.error,
                status: 500
            }
        }
        const category = categories.find(category => category.id === Number(id));
        if(!category){
            return{
                data: null,
                error: "No se encontro la categoria",
                status: 404
            }
        }
        return{
            data: category,
            error: "",
            status: 200
        }
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en getCategoryById: " + error,
            status: 500
        }
    }
}

export const findCategoryByName = async(name: string): Promise<IHttpResponse<ICategory | null>> => {
    try {
        const category = await getCategoryByName(name.toLowerCase());
        if('error' in category){
            return {
                data: null,
                error: category.error,
                status: 500
            }
        }
        return {
            data: category,
            error: "",
            status: 200
        }
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en getCategoryByName: " + error,
            status: 500
        }
    }
}

export const createCategory = async(newCategory: Omit<ICategory, 'id'>): Promise<IHttpResponse<ICategory | null>> => {
    try {
        const category = await postCategory(newCategory);
        if('error' in category){
            return {
                data: null,
                error: category.error,
                status: 500
            }
        }
        return {
            data: category,
            error: "",
            status: 201
        }
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en createCategory: " + error,
            status: 500
        }
    }
}


export const updateCategory = async(id: number, updatedCategory: ICategory): Promise<IHttpResponse<ICategory | null>> => {
    try {
        const category = await putCategory(id, updatedCategory);
        if('error' in category){
            return {
                data: null,
                error: category.error,
                status: 500
            }
        }
        return {
            data: category,
            error: "",
            status: 200
        }
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en updateCategory: " + error,
            status: 500
        }
    }
}

export const deleteCategoryById = async(id: number): Promise<IHttpResponse<ICategory | null>> => {
    try {
        const category = await deleteCategory(id);
        if('error' in category){
            return {
                data: null,
                error: category.error,
                status: 500
            }
        }
        return {
            data: category,
            error: "",
            status: 200
        }
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en deleteCategory: " + error,
            status: 500
        }
    }
}

export const getAllCategoriesWithTypesDeleted = async(): Promise<IHttpResponse<ICategory[]>> => {
    try {
        const categories = await getTypeDeletedInCategory();
        if ('error' in categories) {
            return {
                data: [],
                error: categories.error,
                status: 404
            };
        }
        return {
            data: categories,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: [],
            error: "Se produjo un error en getAllCategoriesWithTypesDeleted: " + error,
            status: 500
        };
    }
}