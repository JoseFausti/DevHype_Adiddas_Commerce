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
  };
  
  const availableColors = useMemo(() => {
    if (!product?.productVariants) return [];
    const unique = new Set(product.productVariants.map(v => v.color.name));
    return Array.from(unique);
  }, [product]);

  // Size
  const handleSizeSelect = (size: number) => {
    if (selectedSize === size) setSelectedSize(null);
    else setSelectedSize(size);
  };

  const availableSizes = useMemo(() => {
    if (!selectedColor || !product?.productVariants) return [];
    const filteredVariants = product.productVariants.filter(v => v.color.name === selectedColor)
    const uniqueSizes = new Set(filteredVariants.map(v => v.size.size));
    return Array.from(uniqueSizes);
  }, [product, selectedColor]);

  // Stock
  const selectedVariant = useMemo(() => {
    if (!selectedColor || !selectedSize || !product?.productVariants) return null;
    const filteredVariants = product.productVariants.filter(v => v.color.name === selectedColor && v.size.size === selectedSize)
    return filteredVariants.filter(v => v.stock > 0)[0] ?? null;
  }, [product, selectedColor, selectedSize]);

  const maxStock = selectedVariant?.stock ?? 0;

const increaseQuantity = () => {
  if (!selectedVariant || !(maxStock > 0)) return;
  if (quantity < maxStock) setQuantity(prev => prev + 1);
};

const decreaseQuantity = () => {
  if (!selectedVariant || !(maxStock > 0)) return;
  if (quantity > 1) setQuantity(prev => prev - 1);
};

  const reset = () => {
    setSelectedColor(null);
    setSelectedSize(null);
    setQuantity(1);
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
