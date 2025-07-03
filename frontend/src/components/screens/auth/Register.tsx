import { Link, useNavigate } from "react-router-dom";
import Styles from './Register.module.css';
import Home from "../landing/Home";
import { Formik, Form, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { registerSchema } from "../../../types/schemas";
import { registerUser } from "../../../data/UsersController";
import { IUser } from "../../../types/types";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (values: Omit<IUser, 'id' | 'deleted' | 'role' | 'address' | 'directions' | 'purchaseOrders'>) => {
    const response = await registerUser(values);
    if (response.status === 201) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500); // Esperamos a mostrar el mensaje antes de redirigir
    }
  };

  return (
    <>
      <div className="home__container">
        <Home />
      </div>
      <div className={Styles.registerForm}>
        {showSuccess && (
          <div className={Styles.login_formMessageSuccess}>
            ¡Usuario creado exitosamente!
          </div>
        )}
        <Formik
          initialValues={{
            username: '',
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={toFormikValidationSchema(registerSchema)}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={Styles.registerForm__container}>
              {/* HEADER: Logo a la izquierda y título centrado */}
              <div className={Styles.register_formHeader}>
                <img
                  className={Styles.register_formImage}
                  src="https://res.cloudinary.com/dxiqjdiz6/image/upload/v1747771636/Logotipo_Adidas_Negro_kmqyhs.png"
                  alt="adidas"
                />
                <h2 className={Styles.register_formTitle}>Registrarse</h2>
              </div>

              {/* CAMPOS: Dos columnas */}
              <div className={Styles.register_formInputContainer}>
                <div className={Styles.inputsColumn}>
                  <div className={Styles.inputsColumnLeft}>
                    <label htmlFor="username">Nombre de Usuario</label>
                    <Field type="text" name="username" id="username" />
                    {errors.username && touched.username && (
                      <p className={Styles.register_formError}>{errors.username}</p>
                    )}

                    <label htmlFor="name">Nombre</label>
                    <Field type="text" name="name" id="name" />
                    {errors.name && touched.name && (
                      <p className={Styles.register_formError}>{errors.name}</p>
                    )}

                    <label htmlFor="surname">Apellido</label>
                    <Field type="text" name="surname" id="surname" />
                    {errors.surname && touched.surname && (
                      <p className={Styles.register_formError}>{errors.surname}</p>
                    )}
                  </div>

                  <div className={Styles.inputsColumnRight}>
                    <label htmlFor="email">Correo Electrónico</label>
                    <Field type="email" name="email" id="email" />
                    {errors.email && touched.email && (
                      <p className={Styles.register_formError}>{errors.email}</p>
                    )}

                    <label htmlFor="password">Contraseña</label>
                    <Field type="password" name="password" id="password" />
                    {errors.password && touched.password && (
                      <p className={Styles.register_formError}>{errors.password}</p>
                    )}

                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <Field type="password" name="confirmPassword" id="confirmPassword" />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className={Styles.register_formError}>{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* BOTONES */}
              <div className={Styles.register_formButtons}>
                <button type="submit" className={Styles.register_formButton}>Crear Cuenta</button>
                <button
                  type="button"
                  className={Styles.register_formCloseButton}
                  onClick={() => navigate('/')}
                >
                  Cerrar
                </button>
              </div>

              {/* MENSAJE */}
              <div className={Styles.register_formTextContainer}>
                <p className={Styles.register_formText}>
                  ¿Ya tienes una cuenta? <span><Link to="/login">Iniciar Sesión</Link></span>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
