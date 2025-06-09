import ColorSelector from '../variant selectors/ColorSelector';
import SizeSelector from '../variant selectors/SizeSelector';
import Styles from './ProductCard.module.css';
import QuantitySelector from '../variant selectors/QuantitySelector';
import { IProduct } from '../../../types/types';
import { useProductVariants } from '../../../hooks/useProductVariants';

interface ProductCardProps {
  product: IProduct; 
}

const ProductCard = ({product}: ProductCardProps) => {

  const {
    availableColors,
    availableSizes,
    selectedColor,
    selectedSize,
    quantity,
    maxStock,
    handleColorSelect,
    handleSizeSelect,
    handleChangeQuantity
  } = useProductVariants( product );

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
        {selectedColor ? (
          <SizeSelector
            sizes={availableSizes}
            selectedSize={selectedSize}
            toggleSize={handleSizeSelect}
          />
        )
        : 
          <p>Seleccione un color primero</p>
        }
      </div>

      <div>
          {selectedColor && selectedSize ? (
          <QuantitySelector
              quantity={quantity}
              maxQuantity={maxStock}
              onChange={handleChangeQuantity}
          />
          )
          : <p>Seleccione un talle primero</p>
          }
      </div>
      
      <div>
          <p>${product.price}</p>
      </div>
      <div>
          <p>Agregar al carrito</p>
          <button>Agregar</button>
      </div>
    </div>
  );
};

export default ProductCard;
