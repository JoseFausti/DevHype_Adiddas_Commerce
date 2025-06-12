import ColorSelector from '../variant selectors/ColorSelector';
import SizeSelector from '../variant selectors/SizeSelector';
import Styles from './ProductCard.module.css';
import QuantitySelector from '../variant selectors/QuantitySelector';
import { IProduct } from '../../../types/types';
import { useProductVariants } from '../../../hooks/useProductVariants';
import { getDecodedToken } from "../../../utils/functions";
import { Role } from "../../../utils/enums";
import { useAppDispatch } from '../../../hooks/redux';
import { addProduct } from '../../../store/slices/cartSlice';
import { updateProductVariant } from '../../../data/ProductVariantsController';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = getDecodedToken();
  const isAdmin: boolean = token? token && token.role === Role.ADMIN : false;
  
  const {
    availableColors,
    availableSizes,
    selectedColor,
    selectedSize,
    selectedVariant,
    quantity,
    maxStock,
    handleColorSelect,
    handleSizeSelect,
    increaseQuantity,
    decreaseQuantity,
  } = useProductVariants(product);

  const handleAddToCart = () => {
    if (!token) return navigate("/login");
    if (selectedVariant && quantity > 0 && maxStock > 0 && quantity <= maxStock) {
      dispatch(addProduct({
        id: selectedVariant.id,
        variant: selectedVariant,
        quantity: quantity
      }));
      // Actualizar la base de datos
      updateProductVariant(selectedVariant.id, {
        id: selectedVariant.id,
        productId: selectedVariant.productId,
        colorId: selectedVariant.color.id,
        sizeId: selectedVariant.size.id,
        stock: selectedVariant.stock - quantity,
      });
      navigate("/")
    }
  };
      

  return (
    <div className={Styles.productShopcartContainer}>
      <div className={Styles.productShopcartCard}>
        <div className={Styles.productShopcartCard__imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={Styles.productShopcartCard__image}
          />
        </div>

        <div className={Styles.productShopcartCard__info}>
          <div className={Styles.productShopcartCard__headerText}>
            <p className={Styles.productShopcartCard__brand}>{product.brand}</p>
            <h2 className={Styles.productShopcartCard__name}>{product.name}</h2>
            <p className={Styles.productShopcartCard__price}>${product.price}</p>
            <p className={Styles.productShopcartCard__description}>{product.description}</p>
          </div>

          <div className={Styles.productShopcartCard__row}>
            <ColorSelector
              colors={availableColors}
              selectedColor={selectedColor}
              toggleColor={handleColorSelect}
            />
          </div>

          <div className={Styles.productShopcartCard__sizes}>
            <p className={Styles.productShopcartCard__sizesLabel}>TALLES:</p>
            {selectedColor ? (
              <SizeSelector
                sizes={availableSizes}
                selectedSize={selectedSize}
                toggleSize={handleSizeSelect}
              />
            ) : (
              <p>Seleccione un color primero</p>
            )}
          </div>

          <div className={Styles.productShopcartCard__quantity}>
            <p className={Styles.productShopcartCard__quantityLabel}>CANTIDAD:</p>
            {selectedColor && selectedSize ? (
              <QuantitySelector
                quantity={quantity}
                maxQuantity={maxStock}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}

              />
            ) : (
              <p>Seleccione un color y un talle primero</p>
            )}
          </div>

          <button 
            className={Styles.productShopcartCard__button} 
            style={{ 
              display: isAdmin ? 'none' : 'block',
              backgroundColor: !selectedVariant || quantity < 1 || maxStock < 1 ? '#ccc' : '#000'
             }}
            disabled={!selectedVariant || quantity < 1 || maxStock < 1}
            onClick={() => {handleAddToCart()}}
          >
            AÑADIR AL CARRITO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
