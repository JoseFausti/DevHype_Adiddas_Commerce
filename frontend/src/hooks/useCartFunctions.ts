import { useMemo, useState } from "react";
import { IProduct } from "../types/types";

interface cartFunctionsProps {
    product: IProduct
}

const useCartFunctions = ({product}: cartFunctionsProps) => {
    const [selectedColor, setSelectedColor] = useState<string | undefined>();
    const [selectedSize, setSelectedSize] = useState<number | undefined>();
    const [quantity, setQuantity] = useState(1);

    // 1. Colores disponibles con stock
    const availableColors = useMemo((): string[] => {
        const uniqueColorsWithStock = new Set<string>();
        product.variants.forEach(variant => {
        if (variant.stock > 0) {
            uniqueColorsWithStock.add(variant.color.colorImg);
        }
        });
        return Array.from(uniqueColorsWithStock);
    }, [product]);

    // 2. Talles disponibles para color seleccionado
    const availableSizes = useMemo((): number[] => {
        const uniqueSizeWithStock = new Set<number>();
        if (!selectedColor) return [];
        product.variants.forEach(variant => {
            if (variant.stock > 0 && variant.color.colorImg === selectedColor) {
                uniqueSizeWithStock.add(variant.size.size);
            }
        });
        return Array.from(uniqueSizeWithStock);
    }, [product, selectedColor]);

    // 3. Cantidad máxima de stock para el color y talle seleccionados
    const maxQuantity = useMemo(() => {
        if (!selectedColor || !selectedSize) return 0;
            const match = product.variants.find(
                v =>
                v.color.colorImg === selectedColor &&
                v.size.size === selectedSize
        );
        return match?.stock ?? 0;
    }, [product, selectedColor, selectedSize]);

    const handleColorSelect = (color: string) => {
        setSelectedColor(prev =>
            prev === color ? undefined : color
        );
        setSelectedSize(undefined); // reseteamos el talle al cambiar el color
    };

    const handleSizeSelect = (size: number) => {
        setSelectedSize(prev =>
            prev === size ? undefined : size
        );
    };

    const handleQuantityChange = (value: number) => {
        if (value >= 1 && value <= maxQuantity) {
            setQuantity(value);
        }
    };

    return {
        selectedColor,
        selectedSize,
        quantity,
        availableColors,
        availableSizes,
        maxQuantity,
        handleColorSelect,
        handleSizeSelect,
        handleQuantityChange,
    };
}

export default useCartFunctions
