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
}

const ProductLandingCard: React.FC<ProductLandingCardProps> = ({
  carrousel,
  activeIndex,
  next,
  prev,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToProduct = (product: IProduct) => {
    dispatch(setProductActive(product));
    navigate(`/products/${product.id}`);
  };

  // Se asume un ancho fijo para la tarjeta y un gap correspondiente (deben coincidir con el CSS)
  const cardWidth = 250; // ancho de la tarjeta en píxeles
  const gap = 16; // gap entre tarjetas en píxeles
  const trackTranslate = activeIndex * (cardWidth + gap);

  return (
    <div className={Styles.productCardWrapper}>
      <button
        className={`${Styles.navButton} ${Styles.leftButton}`}
        onClick={prev}
      >
        <ChevronLeft size={32} />
      </button>

      <div className={Styles.productCard}>
        <div
          className={Styles.productTrack}
          style={{ transform: `translateX(-${trackTranslate}px)` }}
        >
          {carrousel.map((product) => (
            <div
              key={product.id}
              className={Styles.productCardItem}
              onClick={() => goToProduct(product)}
            >
              <img src={product.image} alt={product.name} />
              <div className={Styles.info}>
                <div className={Styles.left}>
                  <div className={Styles.nameRow}>
                    <h3 className={Styles.name}>{product.name}</h3>
                    {product.discounts.length > 0 && (
                      <span className={Styles.discountTag}>
                        -{Math.max(...product.discounts.map(d => d.percentage))}%
                      </span>
                    )}
                  </div>

                  {product.discounts.length > 0 ? (
                    <>
                      <p className={Styles.oldPrice}>${product.price.toFixed(2)}</p>
                      <p className={Styles.discountPrice}>
                        ${(
                          product.price *
                          (1 - Math.max(...product.discounts.map(d => d.percentage)) / 100)
                        ).toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className={Styles.price}>${product.price.toFixed(2)}</p>
                  )}
                </div>
                <button
                  className={Styles.readMore}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className={`${Styles.navButton} ${Styles.rightButton}`}
        onClick={next}
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default ProductLandingCard;
