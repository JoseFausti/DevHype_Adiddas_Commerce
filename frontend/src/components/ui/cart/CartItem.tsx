import { X } from "lucide-react";
import Styles from "./CartItem.module.css";
import { IDetail, IProduct } from "../../../types/types";
import { JSX, useEffect, useState } from "react";
import { findProductById } from "../../../data/ProductsController";
import { useAppDispatch } from "../../../hooks/redux";
import { removeProduct } from "../../../store/slices/cartSlice";
import { calculateFinalPrice } from "../../../utils/functions";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: IDetail;
}

const CartItem = ({ item }: CartItemProps) => {

  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await findProductById(item.variant.productId);
      if (response && response.status === 200) {
        setProduct(response.data);
      } else {
        console.error("Error fetching product:", response.error);
      }
    };
    fetchProduct();
  }, [item]);

  const HandleDeleteItem = (): JSX.Element => {
    return (
      <>
        <div className={Styles.deleteConfirmationContainer}>
          <div className={Styles.deleteConfirmation}>
            <h3 className={Styles.confirmationTitle}>¿Seguro que deseas eliminar <br />este producto?</h3>
            <div className={Styles.confirmationButtonsContainer}>
              {/* Botones de confirmación y cancelación */}
              <button className={Styles.confirmButton} onClick={() => { return dispatch(removeProduct(item)); setOpenModal(false) }}>Sí</button>
              <button className={Styles.cancelButton} onClick={() => { return setOpenModal(false) }}>No</button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {openModal && <HandleDeleteItem />}
      <div className={Styles.containerWrapper}>
        <div className={Styles.cartItemWrapper}>
          {/* Título de la vista "TU CARRITO" en la parte superior izquierda */}

          <div className={Styles.cartItemContainer}>
            {/* Botón eliminar posicionado en la esquina superior derecha 
              Se usa el icono X importado desde lucide-react */}
            <button className={Styles.deleteButton}>
              <X
                size={20}
                style={{
                  border: "none",
                  cursor: "pointer",
                  outline: "none", // Esto remueve el borde negro
                }}
                onClick={() => { setOpenModal(true) }}
              />
            </button>

            {/* Enlace a la vista del producto */}
            <Link to={`/products/${item.variant.productId}`} className={Styles.clickableContent}>
              <div className={Styles.imageWrapper}>
                <img
                  src={product?.image}
                  alt="Imagen del producto"
                  className={Styles.productImage}
                />
              </div>

              <div className={Styles.infoWrapper}>
                <div className={Styles.productInfo}>
                  <h3>{product?.name}</h3>
                  <p>{product?.brand}</p>
                </div>

                <div className={Styles.containerVariants}>
                  <div className={Styles.colorInfo}>
                    <div
                      className={Styles.colorCircle}
                      style={{ backgroundColor: item?.variant.color.name }}
                    ></div>
                  </div>
                  <div className={Styles.quantityInfo}>
                    <p>Cantidad: {item?.quantity}</p>
                  </div>
                  <div className={Styles.priceInfo}>
                    {product?.discounts && product.discounts.length > 0 ? (
                      <div className={Styles.discountBlock}>
                        <p className={Styles.discountedPrice}>
                          ${calculateFinalPrice(product.price, product.discounts)}
                        </p>
                        <p className={Styles.originalPrice}>${product.price}</p>
                      </div>
                    ) : (
                      <p className={Styles.normalPrice}>${product?.price}</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
