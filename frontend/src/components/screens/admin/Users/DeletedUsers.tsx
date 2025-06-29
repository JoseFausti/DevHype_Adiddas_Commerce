import { useEffect, useState } from "react";
import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Plus } from "lucide-react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./Users.module.css";
import { IUser } from "../../../../types/types";
import { restoreUserById, getAllDeletedUsers } from "../../../../data/UsersController";
import { useNavigate } from "react-router-dom";

const DeletedUsers = () => {
  const [deletedUsers, setDeletedUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  const handleRestoreUser = async (id: number) => {
    try {
      const response = await restoreUserById(id);
      if (response.status === 200 && response.data) {
        setDeletedUsers((prev) => prev.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error restaurando usuario:", error);
    }
  };

  useEffect(() => {
    const fetchDeletedUsers = async () => {
      try {
        const response = await getAllDeletedUsers();
        if (response.status === 200) {
          setDeletedUsers(response.data);
        }
      } catch (error) {
        console.error("Error al obtener usuarios eliminados:", error);
      }
    };

    fetchDeletedUsers();
  }, []);

  return (
    <div className={styles.usersContainer}>
      <div className={styles.usersTitle}>
        <h1>Usuarios Eliminados</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <Button
          onClick={() => navigate("/admin/users")}
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
          Volver
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
            {deletedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">
                  <AccountCircleIcon fontSize="large" />
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleRestoreUser(user.id)}>
                    <Plus color="green" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DeletedUsers;
