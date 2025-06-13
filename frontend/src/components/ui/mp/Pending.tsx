import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Styles from './mp.module.css';
import { useAppDispatch } from "../../../hooks/redux";
import { clearCart } from "../../../store/slices/cartSlice";

const Pending = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className={Styles.container}>
      <h1 className={Styles.pending}>Pago pendiente</h1>
      <p className={Styles.message}>Tu pago está en proceso. Te notificaremos una vez se confirme.</p>
      <button onClick={() => navigate('/')} className={Styles.button}>
        Volver al inicio
      </button>
    </div>
  );
};

export default Pending;
