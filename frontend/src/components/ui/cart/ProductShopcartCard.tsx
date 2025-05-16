import { useState, useMemo } from 'react';
import { IProductVariant } from '../../../types/types';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import Styles from './ProductShopcartCard.module.css';
import useCartFunctions from '../../../hooks/useCartFunctions';
import QuantitySelector from './QuantitySelector';

interface ProductShopcartCardProps {
  productVariant: IProductVariant;
}

const ProductShopcartCard = ({ productVariant }: ProductShopcartCardProps) => {
    
  const { product } = productVariant;
  const {availableColors, availableSizes, quantity, selectedColor, selectedSize, maxQuantity, handleColorSelect, handleSizeSelect, handleQuantityChange} = useCartFunctions({ product });

  return (
    <div key={product.id} className={Styles.productShopcartCard}>
      <div className={Styles.productShopcartCard__details}>
        <img
          src={product.image}
          alt={product.name}
          className={Styles.productShopcartCard__image}
        />
        <h3>{product.name}</h3>
        <p>{product.brand}</p>
      </div>

      <div>
        <ColorSelector
          colors={availableColors}
          selectedColor={selectedColor}
          toggleColor={handleColorSelect}
        />
      </div>

      <div>
        {selectedColor && (
          <SizeSelector
            sizes={availableSizes}
            selectedSize={selectedSize}
            toggleSize={handleSizeSelect}
          />
        )}
      </div>

    <div>
        {selectedColor && selectedSize && (
        <QuantitySelector
            quantity={quantity}
            maxQuantity={maxQuantity}
            onChange={handleQuantityChange}
        />
        )}
    </div>
        <div>
            <p>${product.price}</p>
        </div>
        <div>
            <button>X</button>
        </div>
    </div>
  );
};

export default ProductShopcartCard;
