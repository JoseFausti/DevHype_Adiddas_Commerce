import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  // Suponiendo que el nombre del admin se obtiene de alguna variable o contexto, en este caso lo dejamos como estático.
  const adminName = "Joaquín";

  return (
    <aside className={styles.sidebar}>
      {/* Título personalizado: centrado */}
      <h2 className={styles.title}>HOLA, {adminName}!</h2>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/users">Usuarios</Link>
          </li>
          <li>
            <Link to="/admin/products">Productos</Link>
          </li>
          <li>
            <Link to="/">Salir</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
