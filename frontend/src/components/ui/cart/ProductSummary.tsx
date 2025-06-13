import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import Styles from "./ProductSummary.module.css";
import { getAllProducts } from "../../../data/ProductsController";

interface ProductSummaryProps {
  onGoToPay: () => void;
}

const ProductSummary = ({ onGoToPay }: ProductSummaryProps) => {
  
  const {cart} = useAppSelector((state) => state.cart)
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      if (response.status === 200) {
        const matched = cart.map(item => response.data.find(product => product.id === item.variant.productId)!);
        const totalPrice = matched.map(product => product.price).reduce((total, price) => total + price, 0);
        setTotalPrice(totalPrice);
      }
    }
    fetchProducts();
  }, [cart])

  return (
    <>
      <div className={Styles.summaryWrapper}>
        {/* Título del resumen de compra */}
        <h2 className={Styles.summaryTitle}>RESUMEN DEL PEDIDO</h2>

        {/* Fila con cantidad de producto y su precio */}
        <div className={Styles.summaryRow}>
          <span className={Styles.label}>{cart.length} Productos</span>
        </div>

        {/* Fila con el Sub Total y su precio */}
        <div className={Styles.summaryRow}>
          <span className={Styles.label}>Sub Total</span>
          <span className={Styles.value}>${totalPrice.toFixed(2)}</span>
        </div>

        {/* Fila para Entrega (con mayor espacio superior) */}
        <div className={Styles.summaryRowExtra}>
          <span className={Styles.label}>Entrega</span>
          <span className={Styles.value}>Gratis</span>
        </div>

        {/* Fila para Total, sin espacio extra debajo de entrega */}
        <div className={Styles.summaryRowTotal}>
          <span className={Styles.label}>Total</span>
          <span className={Styles.value}>${totalPrice.toFixed(2)}</span>
        </div>

        {/* Botón IR A PAGAR */}
        <button 
          className={Styles.payButton}
          onClick={() => {onGoToPay()}}
        >IR A PAGAR</button>

        {/* Iconos de método de pago (dos imágenes) */}
        <div className={Styles.paymentIcons}>
          <img
            src="https://res.cloudinary.com/dxiqjdiz6/image/upload/v1749692867/Logo_Mercado_Pago_ss6z4p.png"
            alt="Método de pago"
            className={Styles.paymentIcon}
          />
        </div>
      </div>
    </>
  );
};

export default ProductSummary;
