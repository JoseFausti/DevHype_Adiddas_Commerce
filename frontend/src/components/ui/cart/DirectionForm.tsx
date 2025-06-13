// components/forms/DirectionForm.tsx
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
  onSuccess: () => void;
};

export const DirectionForm = ({ user, onSuccess }: Props) => {

    const dispatch = useAppDispatch();

  const initialValues: DirectionFormData = {
    street: "",
    number: 0,
    locality: "",
    city: "",
    country: "",
    postalCode: 0,
  };

  const handleSubmit = async (values: DirectionFormData) => {
    try {
      const directionResponse = await createDirection(values);
      if (directionResponse.status === 201) {
        const directionIds = directionResponse.data!.id;
        console.log(directionIds);

        const userResponse = await updateUser(user.id, {
            ...user,
            directionIds: [directionIds]
        });

        dispatch(editUser(userResponse.data!));

        console.log("Dirección creada y usuario actualizado");
        onSuccess();
      }
    } catch (error) {
      console.error("Error al crear dirección y actualizar usuario", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(directionSchema)}
      onSubmit={handleSubmit}
    >
      <Form className={Styles.form}>
        <label>Calle</label>
        <Field name="street" />
        <ErrorMessage name="street" component="div" />

        <label>Número</label>
        <Field name="number" type="number" />
        <ErrorMessage name="number" component="div" />

        <label>Localidad</label>
        <Field name="locality" />
        <ErrorMessage name="locality" component="div" />

        <label>Ciudad</label>
        <Field name="city" />
        <ErrorMessage name="city" component="div" />

        <label>País</label>
        <Field name="country" />
        <ErrorMessage name="country" component="div" />

        <label>Código Postal</label>
        <Field name="postalCode" type="number" />
        <ErrorMessage name="postalCode" component="div" />

        <button type="submit">Guardar Dirección</button>
      </Form>
    </Formik>
  );
};
