import { ChevronLeft, ChevronRight } from "lucide-react";
import { IProduct } from "../../../types/types";
import Styles from "./ProductLandingCard.module.css";
import { useAppDispatch } from "../../../hooks/redux";
import { setProductActive } from "../../../store/slices/productSlice";
import { useNavigate } from "react-router-dom";

interface ProductLandingCardProps {
  carrousel: IProduct[];
  activeIndex: number;
  next: () => void;
  prev: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  visibleQuantity: number;
  showSeeMoreCard?: boolean;
}

const ProductLandingCard: React.FC<ProductLandingCardProps> = ({
  carrousel,
  activeIndex,
  next,
  prev,
  canScrollLeft,
  canScrollRight,
  visibleQuantity,
  showSeeMoreCard,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToProduct = (product: IProduct) => {
    dispatch(setProductActive(product));
    navigate(`/products/${product.id}`);
  };

  // 🔹 Cálculo de desplazamiento seguro
  const cardWidth = 250; // px
  const gap = 16; // px
  const translateX = activeIndex * (cardWidth + gap);
  const maxTranslate =
    Math.max(0, (carrousel.length + 2.3 - visibleQuantity) * (cardWidth + gap));
  const safeTranslate = Math.min(translateX, maxTranslate);

  return (
    <div className={Styles.productCardWrapper}>
      {canScrollLeft && (
        <button
          className={`${Styles.navButton} ${Styles.leftButton}`}
          onClick={prev}
        >
          <ChevronLeft size={32} />
        </button>
      )}

      <div className={Styles.productCard}>
        <div
          className={Styles.productTrack}
          style={{ transform: `translateX(-${safeTranslate}px)` }}
        >
          {carrousel.map((product) => (
            <div
              key={product.id}
              className={Styles.productCardItem}
              onClick={() => goToProduct(product)}
            >
              {/* Tarjeta normal */}
              <img src={product.image} alt={product.name} />
              <div className={Styles.info}>
                <div className={Styles.left}>
                  <div className={Styles.nameRow}>
                    <h3 className={Styles.name}>{product.name}</h3>
                    {product.discounts.length > 0 && (
                      <span className={Styles.discountTag}>
                        -{Math.max(...product.discounts.map((d) => d.percentage))}%
                      </span>
                    )}
                  </div>

                  {product.discounts.length > 0 ? (
                    <>
                      <p className={Styles.oldPrice}>${product.price.toFixed(2)}</p>
                      <p className={Styles.discountPrice}>
                        $
                        {(
                          product.price *
                          (1 - Math.max(...product.discounts.map((d) => d.percentage)) / 100)
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

          {/* Tarjeta de "ver más productos" */}

          {showSeeMoreCard && (
            <div
              className={`${Styles.productCardItem} ${Styles.seeMoreCard}`}
              onClick={() => navigate('/products')}
            >
              <div className={Styles.seeMoreContent}>
                <p>Click aquí para ver más productos</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {canScrollRight && (
        <button
          className={`${Styles.navButton} ${Styles.rightButton}`}
          onClick={next}
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
};

export default ProductLandingCard;
