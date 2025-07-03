import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Styles from "./DirectionForm.module.css";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { DirectionFormData, directionSchema } from "../../../types/schemas";
import { createDirection } from "../../../data/DirectionsController";
import { updateUser } from "../../../data/UsersController";
import { IUser } from "../../../types/types";
import { useAppDispatch } from "../../../hooks/redux";
import { editUser } from "../../../store/slices/userSlice";

type Props = {
  user: IUser;
  createOrder: () => void;
  onSuccess: () => void;
  onClose: () => void;
};

export const DirectionForm = ({ user, createOrder,  onSuccess, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const [selectedDirectionId, setSelectedDirectionId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(user.directions.length === 0); // Mostrar form si no hay direcciones

  const initialValues: DirectionFormData = {
    street: "",
    number: 0,
    locality: "",
    city: "",
    country: "",
    postalCode: 0,
  };

  const handleSelectDirection = () => {
    const selected = user.directions.find((d) => d.id === selectedDirectionId);
    if (selected) {
      console.log("Dirección seleccionada:", selected);
      onClose();
      onSuccess(); // o pasar la dirección seleccionada si hace falta
    }
  };

  const handleAddDirection = async (values: DirectionFormData) => {
    try {
      const directionResponse = await createDirection(values);
      if (directionResponse.status === 201) {
        const directionId = directionResponse.data!.id;

        const updatedUser = await updateUser(user.id, {
          ...user,
          directionIds: [...user.directions.map((d) => d.id), directionId],
        });

        dispatch(editUser(updatedUser.data!));
        console.log("Dirección agregada y usuario actualizado");

        setShowForm(false);
        onSuccess();
      }
    } catch (error) {
      console.error("Error al agregar dirección", error);
    }
  };

  return (
    <div className={Styles.wrapper}>
      {!showForm ? (
        <>
          {user.directions.length > 0 ? (
            <>
              <ul className={Styles.directionList}>
                {user.directions.map((dir) => (
                  <li key={dir.id} className={Styles.directionItem}>
                    <label>
                      <input
                        type="radio"
                        name="selectedDirection"
                        value={dir.id}
                        onChange={() => setSelectedDirectionId(dir.id)}
                      />
                      {`${dir.street}, ${dir.number}, ${dir.locality}, ${dir.city}, ${dir.country}, CP ${dir.postalCode}`}
                    </label>
                  </li>
                ))}
              </ul>

              <div className={Styles.buttons}>
                <button
                  className={Styles.primaryButton}
                  onClick={() => { handleSelectDirection(); createOrder(); }}
                  disabled={selectedDirectionId === null}
                  
                >
                  Confirmar dirección
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className={Styles.secondaryButton}
                >
                  Agregar nueva dirección
                </button>
              </div>
            </>
          ) : (
            <p>No hay direcciones cargadas.</p>
          )}
        </>
      ) : (
        <>
          <h4>Agregar nueva dirección</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(directionSchema)}
            onSubmit={handleAddDirection}
          >
            {() => (
              <div className={Styles.formContainer}>
                <Form className={Styles.form}>
                  <div className={Styles.formGrid}>
                    <div>
                      <label>Calle</label>
                      <Field name="street" />
                      <ErrorMessage name="street" component="div" />
                    </div>

                    <div>
                      <label>Número</label>
                      <Field name="number" type="number" />
                      <ErrorMessage name="number" component="div" />
                    </div>

                    <div>
                      <label>Localidad</label>
                      <Field name="locality" />
                      <ErrorMessage name="locality" component="div" />
                    </div>

                    <div>
                      <label>Ciudad</label>
                      <Field name="city" />
                      <ErrorMessage name="city" component="div" />
                    </div>

                    <div>
                      <label>País</label>
                      <Field name="country" />
                      <ErrorMessage name="country" component="div" />
                    </div>

                    <div>
                      <label>Código Postal</label>
                      <Field name="postalCode" type="number" />
                      <ErrorMessage name="postalCode" component="div" />
                    </div>
                  </div>

                  <div className={Styles.buttons}>
                    <button className={Styles.primaryButton} type="submit">
                      Guardar Dirección
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className={Styles.secondaryButton}
                    >
                      Cancelar
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};