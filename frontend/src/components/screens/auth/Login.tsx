import { Link, useNavigate } from "react-router-dom";
import Styles from './Login.module.css';
import Home from "../landing/Home";
import { Formik, Form, Field } from "formik";
import { loginSchema } from "../../../types/schemas";
import { loginUser } from "../../../data/UsersController";
import { toFormikValidationSchema } from "zod-formik-adapter";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: { username: string; password: string }) => {
    const response = await loginUser(values.username, values.password);
    if (response.status === 200) {
      navigate('/');
    }
  };

  return (
    <>
      <div className="home__container">
        <Home />
      </div>
      <div className={Styles.loginForm}>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={toFormikValidationSchema(loginSchema)}
          onSubmit={handleSubmit}
        >
        {({ errors, touched }) => (
            <Form className={Styles.loginForm__container}>
              <div className={Styles.login_formHeader}>
                <img className={Styles.login_formImage} src="https://res.cloudinary.com/dxiqjdiz6/image/upload/v1747771636/Logotipo_Adidas_Negro_kmqyhs.png" alt="adidas" />
                <h2 className={Styles.login_formTitle}>Iniciar Sesión</h2>
              </div>

              <div className={Styles.login_formInputContainer}>
                <label htmlFor="email">Usuario</label>
                <Field type="text" name="username" id="username" />
                {errors.username && touched.username && (
                  <p className={Styles.login_formError}>{errors.username}</p>
                )}

                <label htmlFor="password">Contraseña</label>
                <Field type="password" name="password" id="password" />
                {errors.password && touched.password && (
                  <p className={Styles.login_formError}>{errors.password}</p>
                )}
              </div>

              <div>
                <button type="submit" className={Styles.login_formButton}>Iniciar Sesión</button>
              </div>

              <div className={Styles.login_formTextContainer}>
                <p className={Styles.login_formText}>
                  ¿No tienes una cuenta? <span><Link to={'/register'}>Crear Cuenta</Link></span>
                </p>
                <button
                  type="button"
                  className={Styles.login_formCloseButton}
                  onClick={() => navigate('/')}
                >
                  Cerrar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
