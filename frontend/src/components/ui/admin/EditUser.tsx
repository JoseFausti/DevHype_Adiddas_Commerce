import { Close } from "@mui/icons-material";
import { IUser, ICreateUpdateUser } from "../../../types/types";
import styles from "./EditUser.module.css";
import { Dispatch, SetStateAction } from "react";
import {
  Modal,
  IconButton,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { updateUser } from "../../../data/UsersController";
import { Role } from "../../../utils/enums";
import { useAppDispatch } from "../../../hooks/redux";
import { editUser } from "../../../store/slices/userSlice";

interface EditUserProps {
  user: IUser;
  setModal: Dispatch<SetStateAction<{ view: boolean; edit: boolean, create: boolean }>>;
  open: boolean;
}

const EditUser = ({ user, setModal, open }: EditUserProps) => {
  const dispatch = useAppDispatch();

  const initialValues = {
    username: user.username,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
  };

  const onSubmit = async (
    values: typeof initialValues,
    { setSubmitting, setErrors }: FormikHelpers<typeof initialValues>
  ) => {
    const updatedUser: ICreateUpdateUser = {
      ...values,
      password: undefined,
      directionIds: user.directions.map((d) => d.id),
    };

    try {
      const response = await updateUser(user.id, updatedUser);
      if (response.status === 200 && response.data) {
        dispatch(editUser(response.data));
        console.log("Usuario actualizado:", response.data);
        setModal({ view: false, edit: false, create: false });
      } else {
        setErrors({ email: response.error || "Error al actualizar" });
      }
    } catch (error) {
      setErrors({ email: "Error inesperado: " + error });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={() => setModal({ view: false, edit: false, create: false })}>
      <div className={styles.modalBox}>
        <header className={styles.modalHeader}>
          <Typography component="h2" className={styles.modalTitle}>
            Editar usuario: {user.username}
          </Typography>
          <IconButton
            onClick={() => setModal({ view: false, edit: false, create: false })}
            className={styles.closeButton}
            aria-label="Cerrar"
          >
            <Close />
          </IconButton>
        </header>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="username"
                as={TextField}
                label="Usuario"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="username" component="p" className={styles.error} />

              <Field
                name="name"
                as={TextField}
                label="Nombre"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="name" component="p" className={styles.error} />

              <Field
                name="surname"
                as={TextField}
                label="Apellido"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="surname" component="p" className={styles.error} />

              <Field
                name="email"
                as={TextField}
                label="Email"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="email" component="p" className={styles.error} />

              <Field
                name="role"
                as={TextField}
                select
                label="Rol"
                fullWidth
                margin="normal"
              >
                <MenuItem value={Role.USER}>Usuario</MenuItem>
                <MenuItem value={Role.ADMIN}>Admin</MenuItem>
              </Field>
              <ErrorMessage name="role" component="p" className={styles.error} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                  marginTop: 16,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setModal({ view: false, edit: false, create: false })}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  Guardar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditUser;
