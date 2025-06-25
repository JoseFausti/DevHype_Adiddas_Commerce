import { axiosInstanceFile } from "../config/axiosConfig";
import { API_IMAGE_URL } from "../utils/consts";

export const uploadImage = async(file: File): Promise<string | { error: string; }> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axiosInstanceFile.post(`${API_IMAGE_URL}`, formData);
        return data;
    } catch (error) {
        return {
            error: "Se produjo un error al subir la imagen: " + error,
        }
    }
}