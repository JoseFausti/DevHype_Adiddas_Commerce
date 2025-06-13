import { useNavigate } from "react-router-dom";
import Styles from './mp.module.css';

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className={Styles.container}>
      <h1 className={Styles.failure}>Pago fallido</h1>
      <p className={Styles.message}>Ocurrió un error al procesar el pago. Intenta nuevamente más tarde.</p>
      <button onClick={() => navigate('/')} className={Styles.button}>
        Volver al inicio
      </button>
    </div>
  );
};

export default Failure;
