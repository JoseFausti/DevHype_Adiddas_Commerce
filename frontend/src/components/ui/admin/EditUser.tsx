import { Close } from "@mui/icons-material";
import { IUser, ICreateUpdateUser } from "../../../types/types";
import styles from "./EditUser.module.css";
import { Dispatch, SetStateAction } from "react";
import { Modal, IconButton, Typography, TextField, Button, MenuItem } from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { updateUser } from "../../../data/UsersController";
import { Role } from "../../../utils/enums";
import { useAppDispatch } from "../../../hooks/redux";
import { editUser } from "../../../store/slices/userSlice";

interface EditUserProps {
  user: IUser;
  setModal: Dispatch<SetStateAction<{ view: boolean; edit: boolean }>>;
  open: boolean;
}

const EditUser = ({ user, setModal, open }: EditUserProps) => {

    const dispatch = useAppDispatch();

  // Valores iniciales: todo fijo excepto role que puede cambiar
  const initialValues = {
    role: user.role,
  };

  const onSubmit = async (
    values: { role: Role },
    { setSubmitting, setErrors }: FormikHelpers<{ role: Role }>
    ) => {
    // Construir objeto para updateUser: todos los datos del user original,
    // pero con role modificado si cambió
    const updatedUser: ICreateUpdateUser = {
      username: user.username,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: undefined, // no se cambia contraseña
      role: values.role,
      directionIds: user.directions.map(d => d.id),
    };

    try {
      const response = await updateUser(user.id, updatedUser);
      if (response.status === 200 && response.data) {
        setModal({ view: false, edit: false });
        dispatch(editUser(response.data));
        console.log("Usuario actualizado:", response.data);
      } else {
        setErrors({ role: response.error || "Error actualizando usuario" });
      }
    } catch (error) {
      setErrors({ role: "Error inesperado: " + error });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={() => setModal({ view: false, edit: false })}>
      <div className={styles.modalBox}>
        <header className={styles.modalHeader}>
          <Typography component="h2" className={styles.modalTitle}>
            Editar rol de {user.username}
          </Typography>
          <IconButton
            onClick={() => setModal({ view: false, edit: false })}
            className={styles.closeButton}
            aria-label="Cerrar"
          >
            <Close />
          </IconButton>
        </header>

        {/* Datos fijos */}
        <div className={styles.userInfo}><strong>Nombre:</strong> {user.name}</div>
        <div className={styles.userInfo}><strong>Apellido:</strong> {user.surname}</div>
        <div className={styles.userInfo}><strong>Correo:</strong> {user.email}</div>

        {/* Formulario solo para el rol */}
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
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

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: 16 }}>
                <Button variant="outlined" onClick={() => setModal({ view: false, edit: false })} disabled={isSubmitting}>
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
