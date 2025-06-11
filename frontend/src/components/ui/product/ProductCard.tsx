import ColorSelector from '../variant selectors/ColorSelector';
import SizeSelector from '../variant selectors/SizeSelector';
import Styles from './ProductCard.module.css';
import QuantitySelector from '../variant selectors/QuantitySelector';
import { IProduct } from '../../../types/types';
import { useProductVariants } from '../../../hooks/useProductVariants';
import { getDecodedToken } from "../../../utils/functions";
import { Role } from "../../../utils/enums";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {

  const token = getDecodedToken();
  const isAdmin: boolean = token? token && token.role === Role.ADMIN : false;

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
  } = useProductVariants(product);

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

            {selectedColor && (
              <QuantitySelector
                quantity={quantity}
                maxQuantity={maxStock}
                onChange={handleChangeQuantity}
              />
            )}
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

          <button className={Styles.productShopcartCard__button} style={{ display: isAdmin ? 'none' : 'block' }}>
            AÑADIR AL CARRITO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
