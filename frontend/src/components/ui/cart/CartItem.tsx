import { X } from "lucide-react";
import Styles from "./CartItem.module.css";
import { IDetail, IProduct } from "../../../types/types";
import { JSX, useEffect, useState } from "react";
import { findProductById } from "../../../data/ProductsController";
import { useAppDispatch } from "../../../hooks/redux";
import { removeProduct } from "../../../store/slices/cartSlice";

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

            {/* Contenedor para la imagen del producto */}
            <div className={Styles.imageWrapper}>
              {product ? (
                <img src={product.image} alt={product.name} className={Styles.productImage} />
              ) : (
                <div className={Styles.imagePlaceholder}>Cargando imagen...</div>
              )}
            </div>

            {/* Contenedor para la información del producto, organizado horizontalmente */}
            <div className={Styles.infoWrapper}>
              {/* Bloque para el nombre y la marca del producto */}
              <div className={Styles.productInfo}>
                <h3>{product?.name}</h3>
                <p>{product?.brand}</p>
              </div>

              <div className={Styles.containerVariants}>
                {/* Bloque para mostrar el color seleccionado en forma de redondel */}
                <div className={Styles.colorInfo}>
                  <div className={Styles.colorCircle} style={{ backgroundColor: item?.variant.color.name }}></div>
                </div>

                {/* Bloque para mostrar la cantidad */}
                <div className={Styles.quantityInfo}>
                  <p>Cantidad: {item?.quantity}</p>
                </div>

                {/* Bloque para mostrar el precio */}
                <div className={Styles.priceInfo}>
                  <p>${product?.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default CartItem;
