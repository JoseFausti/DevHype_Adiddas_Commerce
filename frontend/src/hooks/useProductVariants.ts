import { useState, useMemo } from "react";
import { IProduct } from "../types/types";

export function useProductVariants(product: IProduct) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Color
  const handleColorSelect = (color: string) => {
    if (selectedColor === color) setSelectedColor(null);
    else setSelectedColor(color);
    // Al cambiar color, también reseteamos el talle
    setSelectedSize(null);
  };

  const availableColors = useMemo(() => {
    if (!product?.productVariants) return [];
    const unique = new Set(product.productVariants.map(v => v.color.name));
    return Array.from(unique);
  }, [product]);

  // Size: ahora mostramos todos los talles posibles desde el inicio
  const availableSizes = useMemo(() => {
    if (!product?.productVariants) return [];
    const variantsToCheck = selectedColor
      ? product.productVariants.filter(v => v.color.name === selectedColor)
      : product.productVariants;

    const uniqueSizes = new Set(variantsToCheck.map(v => v.size.size));
    return Array.from(uniqueSizes);
  }, [product, selectedColor]);

  // Stock
  const selectedVariant = useMemo(() => {
    if (!selectedColor || !selectedSize || !product?.productVariants) return null;
    return product.productVariants.find(
      v => v.color.name === selectedColor && v.size.size === selectedSize
    ) ?? null;
  }, [product, selectedColor, selectedSize]);

  // Si no hay variante seleccionada, devolvemos stock 99 como "ficticio"
  const maxStock = selectedVariant ? selectedVariant.stock : 99;

  const increaseQuantity = () => {
    if (quantity < maxStock) setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const reset = () => {
    setSelectedColor(null);
    setSelectedSize(null);
    setQuantity(1);
  };
  const handleSizeSelect = (size: number) => {
    if (selectedSize === size) setSelectedSize(null);
    else setSelectedSize(size);
  };
  
  return {
    selectedColor,
    setSelectedColor,
    handleColorSelect,
    selectedSize,
    setSelectedSize,
    handleSizeSelect,
    quantity,
    setQuantity,
    increaseQuantity,
    decreaseQuantity,
    maxStock,
    availableColors,
    availableSizes,
    selectedVariant,
    reset,
  };
}
