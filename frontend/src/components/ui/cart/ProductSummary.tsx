import Styles from "./ProductSummary.module.css";

const ProductSummary = () => {
  return (
    <div className={Styles.summaryWrapper}>
      {/* Título del resumen de compra */}
      <h2 className={Styles.summaryTitle}>RESUMEN DEL PEDIDO</h2>

      {/* Fila con cantidad de producto y su precio */}
      <div className={Styles.summaryRow}>
        <span className={Styles.label}>1 Producto</span>
        <span className={Styles.value}>$89.999</span>
      </div>

      {/* Fila con el Sub Total y su precio */}
      <div className={Styles.summaryRow}>
        <span className={Styles.label}>Sub Total</span>
        <span className={Styles.value}>$89.999</span>
      </div>

      {/* Fila para Entrega (con mayor espacio superior) */}
      <div className={Styles.summaryRowExtra}>
        <span className={Styles.label}>Entrega</span>
        <span className={Styles.value}>Gratis</span>
      </div>

      {/* Fila para Total, sin espacio extra debajo de entrega */}
      <div className={Styles.summaryRowTotal}>
        <span className={Styles.label}>Total</span>
        <span className={Styles.value}>$89.999</span>
      </div>

      {/* Botón IR A PAGAR */}
      <button className={Styles.payButton}>IR A PAGAR</button>

      {/* Iconos de método de pago (dos imágenes) */}
      <div className={Styles.paymentIcons}>
        <img
          src="https://res.cloudinary.com/dxiqjdiz6/image/upload/v1749692867/Logo_Mercado_Pago_ss6z4p.png"
          alt="Método de pago"
          className={Styles.paymentIcon}
        />
      </div>
    </div>
  );
};

export default ProductSummary;
