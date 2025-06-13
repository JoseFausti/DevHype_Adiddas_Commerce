import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Styles from './mp.module.css';
import { useAppDispatch } from "../../../hooks/redux";
import { clearCart } from "../../../store/slices/cartSlice";

const Success = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className={Styles.container}>
      <h1 className={Styles.success}>¡Pago exitoso!</h1>
      <p className={Styles.message}>Gracias por tu compra. Pronto recibirás un correo con la confirmación.</p>
      <button onClick={() => navigate('/')} className={Styles.button}>
        Volver al inicio
      </button>
    </div>
  );
};

export default Success;
