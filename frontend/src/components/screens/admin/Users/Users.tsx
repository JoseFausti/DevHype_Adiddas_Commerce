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

// Interfaz para los usuarios según tu backend
interface User {
  id: number;
  name: string;
  role: string; // admin | usuario u otros roles que uses
}

export const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllUsers();
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          setError(response.error || "Error al cargar usuarios");
        }
      } catch (err) {
        setError("Error inesperado al cargar usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className={styles.usersContainer}>Cargando usuarios...</div>;
  if (error) return <div className={styles.usersContainer}>Error: {error}</div>;

  return (
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
              {/* Quité la columna de acción */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">
                  <AccountCircleIcon fontSize="large" />
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
