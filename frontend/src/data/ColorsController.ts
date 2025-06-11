import { deleteColor, getColors, postColor, putColor } from "../http/colors";
import { IColor, IHttpResponse } from "../types/types";

export const getAllColors = async (): Promise<IHttpResponse<IColor[]>> => {
    try {
        const colors = await getColors();
        if ('error' in colors) {
            return {
                data: [],
                error: colors.error,
                status: 404
            };
        }
        return {
            data: colors,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: [],
            error: "Se produjo un error en getAllColors: " + error,
            status: 500
        };
    }
}

export const findColorByName = async(name: string): Promise<IHttpResponse<IColor | null>> => {
    try {
        const colors = await getColors();
        if ('error' in colors) {
            return {
                data: null,
                error: colors.error,
                status: 500
            };
        }
        const color = colors.find(color => color.name === name);
        if (!color) {
            return {
                data: null,
                error: "No se encontró el color",
                status: 404
            };
        }
        return {
            data: color,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en findColorByName: " + error,
            status: 500
        };
    }
}

export const createColor = async(newColor: IColor): Promise<IHttpResponse<IColor | null>> => {
    try {
        const color = await postColor(newColor);
        if ('error' in color) {
            return {
                data: null,
                error: color.error,
                status: 500
            };
        }
        return {
            data: color,
            error: "",
            status: 201
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en createColor: " + error,
            status: 500
        };
    }
}

export const updateColor = async(id: number, updatedColor: IColor): Promise<IHttpResponse<IColor | null>> => {
    try {
        const color = await putColor(id, updatedColor);
        if ('error' in color) {
            return {
                data: null,
                error: color.error,
                status: 500
            };
        }
        return {
            data: color,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en updateColor: " + error,
            status: 500
        };
    }
}

export const deleteColorById = async(id: number): Promise<IHttpResponse<IColor | null>> => {
    try {
        const color = await deleteColor(id);
        if ('error' in color) {
            return {
                data: null,
                error: color.error,
                status: 500
            };
        }
        return {
            data: color,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en deleteColorById: " + error,
            status: 500
        };
    }
}
