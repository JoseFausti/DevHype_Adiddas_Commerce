import React, { useEffect, useState } from "react";
import styles from "./Users.module.css"; // Importa los estilos locales para el componente
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Ícono para representar al usuario
import DeleteIcon from "@mui/icons-material/Delete"; // Ícono para la acción de eliminar
import Swal from "sweetalert2"; // Para las alertas de confirmación

// Interfaz para definir la forma de cada usuario
interface User {
  id: number;
  name: string;
  role: string; // Puede ser "admin" o "usuario"
}

export const Users: React.FC = () => {
  // Estado para almacenar la lista de usuarios
  const [users, setUsers] = useState<User[]>([]);

  // Uso de datos de prueba para maquetar la tabla
  useEffect(() => {
    // Datos de prueba para simular la respuesta de la API
    const demoData: User[] = [
      { id: 1, name: "Usuario Demo 1", role: "admin" },
      { id: 2, name: "Usuario Demo 2", role: "usuario" },
      { id: 3, name: "Usuario Demo 3", role: "usuario" },
    ];
    setUsers(demoData);
  }, []);

  // Función para eliminar un usuario (solo de prueba)
  const deleteUser = (id: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción eliminará al usuario.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter(user => user.id !== id));
        Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
      }
    });
  };

  return (
  
      <div className={styles.usersContainer}>
        {/* Título de la pestaña, centrado */}
        <div className={styles.usersTitle}>
          <h1>Usuarios</h1>
        </div>

        {/* Contenedor para centrar la tabla */}
        <div className={styles.tableContainer}>
          <Table>
            {/* Encabezado de la tabla */}
            <TableHead>
              <TableRow>
                <TableCell align="center">Icono</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Rol</TableCell>
                <TableCell align="center">Acción</TableCell>
              </TableRow>
            </TableHead>
            {/* Cuerpo de la tabla */}
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="center">
                    <AccountCircleIcon fontSize="large" />
                  </TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.role}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => deleteUser(user.id)}>
                      <DeleteIcon color="error" />
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
