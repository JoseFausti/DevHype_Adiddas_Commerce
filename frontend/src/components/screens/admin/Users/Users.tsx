import React, { useEffect, useState } from "react";
import styles from "./Users.module.css"; // Tus estilos locales
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Icono usuario
import { deleteUserById, getAllUsers } from "../../../../data/UsersController"; // Importa tu controlador
import { Edit} from "@mui/icons-material";
import { Role } from "../../../../utils/enums";
import { Eye, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { removeUser, setUserActive, setUsers } from "../../../../store/slices/userSlice";
import { IUser } from "../../../../types/types";
import ViewUser from "../../../ui/admin/ViewUser";
import EditUser from "../../../ui/admin/EditUser";
import { useNavigate } from "react-router-dom";

export const Users: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState({
    view: false,
    edit: false,
  });

  const navigate = useNavigate();

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

  const handleDeleteUser = async (user: IUser) => {
    try {
      const response = await deleteUserById(user.id);
      if (response) {
        dispatch(removeUser(user));
      }
    } catch (error) {
      console.log("Error eliminando usuario:", error);
      }
  };

  return (
    <>
      {openModal.view && userActive ? (
        <ViewUser user={userActive} setModal={setOpenModal} open={true} />
      ) : openModal.edit && userActive ? (
        <EditUser user={userActive} setModal={setOpenModal} open={true} />
      ) : (
        <div className={styles.usersContainer}>
          <div className={styles.usersTitle}>
            <h1>Usuarios Registrados</h1>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <Button
                  onClick={() => navigate("/admin/users/deleted")}
                  variant="contained"
                  sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                  },
                  }}
              >
                  Usuarios Eliminados
              </Button>
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
                        {user_.role !== Role.ADMIN && 
                          <>
                            <Edit className={styles.editIcon} onClick={() => setOpenModal({ ...openModal, edit: true})} />
                            <Trash className={styles.editIcon} onClick={() => handleDeleteUser(user_)} />
                          </>
                        }
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
