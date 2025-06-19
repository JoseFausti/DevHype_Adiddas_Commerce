import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import Cookies from "js-cookie";

import Styles from './Logout.module.css';
import Home from "../landing/Home";
import { Close } from "@mui/icons-material";
import { useEffect } from "react";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  const cancel = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className={Styles.home_container}>
        <Home />
      </div>
      <div className={Styles.logoutForm}>
        <div className={Styles.logoutForm__container}>
          <div className={Styles.logout_formHeader}>
            <img className={Styles.logout_formImage} src="https://res.cloudinary.com/dxiqjdiz6/image/upload/v1747771636/Logotipo_Adidas_Negro_kmqyhs.png" alt="adidas" />
            <h2 className={Styles.logout_formTitle}>CERRAR SESIÓN</h2>
            <Close className={Styles.logout_formClose} onClick={() => handleLogout()} > </Close>
          </div>
          <p className={Styles.logout_formText}>Al elegir esta opción, se cerrará tu sesión en el navegador web que hayas utilizado para acceder a la página web de adidas. Para volver a iniciar sesión, tendrás que ingresar tus credenciales.</p>
          <Formik initialValues={{}} onSubmit={handleLogout}>
            {() => (
              <Form >
                <button type="submit" className={Styles.logout_formButton}>
                  Cerrar Sesión
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Logout;
