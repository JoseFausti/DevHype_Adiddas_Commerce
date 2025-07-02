import { useState } from "react";
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
import { useAppSelector } from '../../../hooks/redux';
import { setProductActive } from '../../../store/slices/productSlice'; // Import necesario si no lo tenías


interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = getDecodedToken();
  const isAdmin: boolean = token ? token.role === Role.ADMIN : false;

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

  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddToCart = () => {
    if (!token) return navigate("/login");

    if (!selectedColor) {
      setErrorMessage("Debes seleccionar un color.");
      return;
    }

    if (!selectedSize) {
      setErrorMessage("Debes seleccionar un talle.");
      return;
    }

    if (quantity < 1) {
      setErrorMessage("Debes seleccionar una cantidad válida.");
      return;
    }

    if (selectedVariant && maxStock > 0 && quantity <= maxStock) {
      dispatch(addProduct({
        id: selectedVariant.id,
        variant: selectedVariant,
        quantity: quantity
      }));

      updateProductVariant(selectedVariant.id, {
        productName: product.name,
        colorName: selectedVariant.color.name,
        sizeNumber: selectedVariant.size.size,
        stock: selectedVariant.stock - quantity,
      });

      setShowMessage(true);
      setErrorMessage("");
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  const { products } = useAppSelector((state) => state.product);

  // Obtener 4 productos al azar, distintos del actual
  const relatedProducts = products
    .filter(p => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

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
            {product.discounts && product.discounts.length > 0 ? (
              <div className={Styles.productShopcartCard__priceWrapper}>
                <p className={Styles.productShopcartCard__oldPrice}>
                  ${product.price.toFixed(2)}
                </p>
                <p className={Styles.productShopcartCard__discountPrice}>
                  ${(
                    product.price *
                    (1 - Math.max(...product.discounts.map(d => d.percentage)) / 100)
                  ).toFixed(2)}
                </p>
                <p className={Styles.productShopcartCard__discountTag}>
                  -{Math.max(...product.discounts.map(d => d.percentage))}%
                </p>
              </div>
            ) : (
              <p className={Styles.productShopcartCard__price}>
                ${product.price.toFixed(2)}
              </p>
            )}
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
            <SizeSelector
              sizes={availableSizes}
              selectedSize={selectedSize}
              toggleSize={handleSizeSelect}
            />
          </div>

          <div className={Styles.productShopcartCard__quantity}>
            <p className={Styles.productShopcartCard__quantityLabel}>CANTIDAD:</p>
            <QuantitySelector
              quantity={quantity}
              maxQuantity={maxStock}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              selectedVariant={selectedVariant}
            />
          </div>

          <button
            className={Styles.productShopcartCard__button}
            style={{ display: isAdmin ? 'none' : 'block' }}
            onClick={handleAddToCart}
          >
            AÑADIR AL CARRITO
          </button>

          {errorMessage && (
            <p className={Styles.errorMessage}>{errorMessage}</p>
          )}

          {showMessage && (
            <div className={Styles.addedMessage}>
              ¡Producto agregado al carrito!
            </div>
          )}
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className={Styles.relatedContainer}>
          <h3 className={Styles.relatedTitle}>TE PUEDE INTERESAR</h3>
          <div className={Styles.relatedGrid}>
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className={Styles.card}
                onClick={() => {
                  dispatch(setProductActive(product));
                  navigate(`/products/${product.id}`);
                }}
              >
                <div className={Styles.imageContainer}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={Styles.image}
                  />
                </div>

                <div className={Styles.info}>
                  <div className={Styles.left}>
                    <h2 className={Styles.name}>
                      {product.name}
                      {product.discounts && product.discounts.length > 0 && (
                        <span className={Styles.discountTag}>
                          {" "}
                          -{product.discounts[0].percentage}%
                        </span>
                      )}
                    </h2>
                    {product.discounts && product.discounts.length > 0 ? (
                      <>
                        <p className={Styles.oldPrice}>${product.price.toFixed(2)}</p>
                        <p className={Styles.discountPrice}>
                          ${(
                            product.price * (1 - product.discounts[0].percentage / 100)
                          ).toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className={Styles.price}>${product.price.toFixed(2)}</p>
                    )}
                  </div>
                  <button className={Styles.readMore}>Read More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
