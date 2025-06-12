import { X } from "lucide-react";
import Styles from "./CartItem.module.css";

const CartItem = () => {
  return (
    <div className={Styles.cartItemWrapper}>
      {/* Título de la vista "TU CARRITO" en la parte superior izquierda */}

      <div className={Styles.cartItemContainer}>
        {/* Botón eliminar posicionado en la esquina superior derecha 
            Se usa el icono X importado desde lucide-react */}
        <button className={Styles.deleteButton}>
          <X size={20} />
        </button>

        {/* Contenedor para la imagen del producto */}
        <div className={Styles.imageWrapper}>
          <img
            src="https://res.cloudinary.com/dxiqjdiz6/image/upload/f_auto,q_auto/v1749581777/w25_wangam.webp"
            alt="Imagen del producto"
            className={Styles.productImage}
          />
        </div>

        {/* Contenedor para la información del producto, organizado horizontalmente */}
        <div className={Styles.infoWrapper}>
          {/* Bloque para el nombre y la marca del producto */}
          <div className={Styles.productInfo}>
            <h3>Campera Mujer X</h3>
            <p>Adidas</p>
          </div>

          {/* Bloque para mostrar el color seleccionado en forma de redondel */}
          <div className={Styles.colorInfo}>
            <div className={Styles.colorCircle}></div>
          </div>

          {/* Bloque para mostrar la cantidad */}
          <div className={Styles.quantityInfo}>
            <p>Cantidad: 1</p>
          </div>

          {/* Bloque para mostrar el precio */}
          <div className={Styles.priceInfo}>
            <p>$89.999</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
