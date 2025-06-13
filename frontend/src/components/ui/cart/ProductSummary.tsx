import { useAppSelector } from "../../../hooks/redux";
import { useEffect, useState } from "react";
import { IDetail, IProduct } from "../../../types/types";
import { findProductById } from "../../../data/ProductsController";
import Styles from "./ProductSummary.module.css";

const ProductSummary = () => {
  const cart: IDetail[] = useAppSelector((state) => state.cart.cart);
  const [products, setProducts] = useState<Record<number, IProduct>>({});

  useEffect(() => {
    const fetchAllProducts = async () => {
      const results = await Promise.all(
        cart.map((item) => findProductById(item.variant.productId))
      );
      const validProducts: Record<number, IProduct> = {};
      results.forEach((res, index) => {
        if (res.status === 200 && res.data !== null) {
          const productId = cart[index].variant.productId;
          validProducts[productId] = res.data;
        }        
      });
      setProducts(validProducts);
    };

    fetchAllProducts();
  }, [cart]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => {
    const product = products[item.variant.productId];
    if (!product) return acc;

    const discount = product.discounts[0]?.percentage ?? 0;
    const price = product.price * (1 - discount / 100);
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className={Styles.summaryWrapper}>
      <h2 className={Styles.summaryTitle}>RESUMEN DEL PEDIDO</h2>

      <div className={Styles.summaryRow}>
        <span className={Styles.label}>
          {totalItems} {totalItems === 1 ? "Producto" : "Productos"}
        </span>
        <span className={Styles.value}>${subtotal.toFixed(2)}</span>
      </div>

      <div className={Styles.summaryRow}>
        <span className={Styles.label}>Sub Total</span>
        <span className={Styles.value}>${subtotal.toFixed(2)}</span>
      </div>

      <div className={Styles.summaryRowExtra}>
        <span className={Styles.label}>Entrega</span>
        <span className={Styles.value}>Gratis</span>
      </div>

      <div className={Styles.summaryRowTotal}>
        <span className={Styles.label}>Total</span>
        <span className={Styles.value}>${subtotal.toFixed(2)}</span>
      </div>

      <button className={Styles.payButton}>IR A PAGAR</button>

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
