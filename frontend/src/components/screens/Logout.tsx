import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import Cookies from "js-cookie";

import Styles from './Logout.module.css';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  return (
    <div className={Styles.logoutForm}>
      <div className={Styles.logoutForm__container}>
        <h2 className={Styles.logout_formTitle}>Cerrar Sesión</h2>
        <Formik initialValues={{}} onSubmit={handleLogout}>
          {() => (
            <Form>
              <button type="submit" className={Styles.logout_formButton}>
                Confirmar Cerrar Sesión
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Logout;
