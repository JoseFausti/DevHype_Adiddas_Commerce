import { Close } from "@mui/icons-material";
import { IUser } from "../../../types/types";
import styles from "./ViewUser.module.css";
import { Dispatch, SetStateAction } from "react";
import { Modal, IconButton, Typography } from "@mui/material";

interface ViewUserProps {
  user: IUser;
  setModal: Dispatch<SetStateAction<{ view: boolean; edit: boolean, create: boolean }>>;
  open: boolean;
}

const ViewUser = ({ user, setModal, open }: ViewUserProps) => {
  return (
    <Modal open={open} onClose={() => setModal({ view: false, edit: false, create: false })}>
      <div className={styles.modalBox}>
        <header className={styles.modalHeader}>
          <Typography component="h2" className={styles.modalTitle}>
            {user.username}
          </Typography>
          <IconButton
            onClick={() => setModal({ view: false, edit: false, create: false })}
            className={styles.closeButton}
            aria-label="Cerrar"
          >
            <Close />
          </IconButton>
        </header>

        <div className={styles.userInfo}>
          <strong>Nombre:</strong> {user.name}
        </div>
        <div className={styles.userInfo}>
          <strong>Apellido:</strong> {user.surname}
        </div>
        <div className={styles.userInfo}>
          <strong>Correo:</strong> {user.email}
        </div>
        <div className={styles.userInfo}>
          <strong>Rol:</strong> {user.role}
        </div>
      </div>
    </Modal>
  );
};

export default ViewUser;
