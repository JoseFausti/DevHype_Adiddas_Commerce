import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { deleteUserById, getUserByUsername, updateUser } from "../../../data/UsersController";
import { getDecodedToken } from "../../../utils/functions";
import { ICreateUpdateUser, IDirection, IUser } from "../../../types/types";
import { createDirection } from "../../../data/DirectionsController";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { userSchema } from "../../../types/schemas";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import Cookies from "js-cookie";

const Profile = () => {

  const token = getDecodedToken();
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserByUsername(token!.sub);
        if (response.status === 200) {
          setUser(response.data!);
        } else {
          throw new Error("No se pudo obtener el usuario");
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Cargando datos del usuario...</p>;
  if (!user) return <p>No se pudo cargar el usuario</p>;

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await deleteUserById(id);
      if (response) {
        console.log("Usuario eliminado correctamente");
        Cookies.remove("token");
        navigate("/");
      }
    } catch (error) {
      console.log("Error eliminando usuario:", error);
    }
  };

  const initialValues = {
    name: user.name || "",
    surname: user.surname || "",
    email: user.email || "",
    password: "",
    directions: user.role !== "ADMIN"
      ? (user.directions.length > 0 ? user.directions : [{
        street: "",
        number: 0,
        locality: "",
        city: "",
        country: "",
        postalCode: 0,
      }])
      : [],
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {

      const directionIds: number[] = [];

      const directions: (IDirection | Omit<IDirection, "id">)[] = values.directions;
      for (const direction of directions) {
        if ("id" in direction) {
          // Ya existe, solo se usa su id
          directionIds.push(direction.id);
        } else {
          const res = await createDirection(direction);
          if (res.status === 201) {
            directionIds.push(res.data!.id);
          }
        }
      }

      const updatedUser: ICreateUpdateUser = {
        ...user,
        name: values.name,
        surname: values.surname,
        email: values.email,
        directionIds
      };

      // Solo si el usuario escribió una nueva contraseña
      if (values.password && values.password.trim() !== "") {
        updatedUser.password = values.password;
      }

      await updateUser(user.id, updatedUser);
      console.log("Usuario actualizado correctamente");
      navigate("/");

    } catch (error) {
      console.log("Error actualizando usuario", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Perfil de Usuario</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(userSchema)}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className={styles.formSpacing}>
              <div>
                <label className={styles.label}>Nombre</label>
                <Field name="name" className={styles.input} />
                <ErrorMessage name="name" component="p" className={styles.error} />
              </div>

              <div>
                <label className={styles.label}>Apellido</label>
                <Field name="surname" className={styles.input} />
                <ErrorMessage name="surname" component="p" className={styles.error} />
              </div>

              <div>
                <label className={styles.label}>Email</label>
                <Field name="email" type="email" className={styles.input} />
                <ErrorMessage name="email" component="p" className={styles.error} />
              </div>

              <div>
                <label className={styles.label}>Contraseña</label>
                <Field name="password" type="password"  placeholder="Contraseña Nueva" className={styles.input} />
                <ErrorMessage name="password" component="p" className={styles.error} />
              </div>

              <h3 className={styles.subtitle}>Direcciones</h3>

              {user.role !== "ADMIN" && (
                <FieldArray name="directions">
                  {({ push, remove }) => (
                    <div className={styles.formSpacing}>
                      {values.directions.map((_, index) => (
                        <div key={index} className={styles.addressBox}>
                          <div className={styles.addressGrid}>
                            <Field name={`directions.${index}.street`} placeholder="Calle" className={styles.addressInput} />
                            <Field name={`directions.${index}.number`} placeholder="Número" type="number" className={styles.addressInput} />
                            <Field name={`directions.${index}.locality`} placeholder="Localidad" className={styles.addressInput} />
                            <Field name={`directions.${index}.city`} placeholder="Ciudad" className={styles.addressInput} />
                            <Field name={`directions.${index}.country`} placeholder="País" className={styles.addressInput} />
                            <Field name={`directions.${index}.postalCode`} placeholder="Código Postal" type="number" className={styles.addressInput} />
                          </div>
                          <button type="button" onClick={() => remove(index)} className={styles.deleteDirection}>
                            Eliminar Dirección
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ street: "", number: 0, locality: "", city: "", country: "", postalCode: 0 })}
                        className={styles.grayButton}
                      >
                        Añadir Dirección
                      </button>
                    </div>
                  )}
                </FieldArray>
              )}

              <div className={styles.actionButtons}>
                <button type="submit" className={styles.blackButton}>Guardar Cambios</button>
                <button
                  type="button"
                  onClick={() => setShowConfirmDelete(true)}
                  className={styles.deleteLink}
                >
                  Eliminar Cuenta
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {showConfirmDelete && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <p>¿Seguro que deseas eliminar tu cuenta?</p>
              <div className={styles.buttonGroup}>
                <button onClick={() => handleDeleteUser(user.id)} className={styles.confirmButton}>Sí</button>
                <button onClick={() => setShowConfirmDelete(false)} className={styles.cancelButton}>No</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Profile;