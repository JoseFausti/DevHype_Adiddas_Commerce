import { Close } from "@mui/icons-material";
import { ICreateUpdateUser } from "../../../types/types";
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
import { Role } from "../../../utils/enums";
import { createUser } from "../../../data/UsersController";
import { useAppDispatch } from "../../../hooks/redux";
import { addUser } from "../../../store/slices/userSlice";

interface CreateUserProps {
  setModal: Dispatch<SetStateAction<{ view: boolean; edit: boolean; create: boolean }>>;
  open: boolean;
}

const CreateUser = ({ setModal, open }: CreateUserProps) => {
  const dispatch = useAppDispatch();

  const initialValues: ICreateUpdateUser = {
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    role: Role.USER,
    directionIds: [], // se puede dejar vacío al crear
  };

  const onSubmit = async (
    values: ICreateUpdateUser,
    { setSubmitting, setErrors, resetForm }: FormikHelpers<ICreateUpdateUser>
  ) => {
    try {
      const response = await createUser(values);
      if (response.status === 201 && response.data) {
        dispatch(addUser(response.data));
        console.log("Usuario creado:", response.data);
        setModal({ view: false, edit: false, create: false });
        resetForm();
      } else {
        setErrors({ email: response.error || "Error al crear usuario" });
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
            Crear nuevo usuario
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
                name="password"
                as={TextField}
                label="Contraseña"
                type="password"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="password" component="p" className={styles.error} />

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
                  Crear
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default CreateUser;
