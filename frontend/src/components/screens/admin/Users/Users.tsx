import React, { useEffect, useState } from "react";
import styles from "./Users.module.css"; // Tus estilos locales
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Icono usuario
import { getAllUsers } from "../../../../data/UsersController"; // Importa tu controlador
import { Edit} from "@mui/icons-material";
import { Role } from "../../../../utils/enums";
import { Eye } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setUserActive, setUsers } from "../../../../store/slices/userSlice";
import { IUser } from "../../../../types/types";

export const Users: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState({
    view: false,
    edit: false,
  });

  const { users, userActive } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllUsers();
        if (response.status === 200) {
          dispatch(setUsers(response.data));
        } else {
          setError(response.error || "Error al cargar usuarios");
        }
      } catch (err) {
        setError("Error inesperado al cargar usuarios" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className={styles.usersContainer}>Cargando usuarios...</div>;
  if (error) return <div className={styles.usersContainer}>Error: {error}</div>;

  return (
    <>
      {openModal ? (
        openModal.view && <ViewUser user={userActive} />
        openModal.edit && <EditUser user={userActive} />
      ) : (
        <div className={styles.usersContainer}>
          <div className={styles.usersTitle}>
            <h1>Usuarios Registrados</h1>
          </div>

          <div className={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Icono</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Rol</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user_: IUser) => (
                  <TableRow key={user_.id}>
                    <TableCell align="center">
                      <AccountCircleIcon fontSize="large" />
                    </TableCell>
                    <TableCell align="center">{user_.name}</TableCell>
                    <TableCell align="center">
                        {user_.role}
                    </TableCell>
                    <TableCell align="center">
                      <div 
                        className={styles.editIconContainer}
                        onClick={() => dispatch(setUserActive(user_))}
                      >
                        <Eye className={styles.editIcon} onClick={() => setOpenModal({ ...openModal, view: true})}/>
                        {user_.role !== Role.ADMIN && <Edit className={styles.editIcon} onClick={() => setOpenModal({ ...openModal, edit: true})} />}
                      </div>
                    </TableCell>
                  </TableRow> 
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        )
      }
    </>
  );
};
