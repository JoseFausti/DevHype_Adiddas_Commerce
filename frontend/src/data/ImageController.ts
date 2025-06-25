import { uploadImage } from "../http/Image";

export const UploadImageController = async (file: File) => {
    try {
        const image = await uploadImage(file);
        if (typeof image === "object" && image !== null && 'error' in image) {
            return {
                data: null,
                error: image.error,
                status: 500
            }
        }
        return {
            data: image,
            error: "",
            status: 200
        }
    } catch (error) {
        return {
            error: "Se produjo un error al subir la imagen: " + error,
        }
    }
};