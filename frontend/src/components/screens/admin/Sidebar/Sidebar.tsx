import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import styles from './Sidebar.module.css';
import { ITokenPayload } from '../../../../types/types';
import { getDecodedToken } from '../../../../utils/functions';

const Sidebar: React.FC = () => {

  const token: ITokenPayload | null = getDecodedToken();
  const {sub: username} = token!;

  return (
    <aside className={styles.sidebar}>
      {/* Título personalizado: centrado */}
      <h2 className={styles.title}>HOLA, {username}!</h2>
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
            <Link to="/admin/categories">Categorias</Link>
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
