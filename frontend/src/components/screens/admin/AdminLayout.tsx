// AdminLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar/Sidebar";

const AdminLayout: React.FC = () => {

  const layoutStyle: React.CSSProperties = {
    display: "flex",
    minHeight: "110vh",
  };
  const contentStyle: React.CSSProperties = {
    flex: 1,
    /* Agrega un ancho máximo y márgenes automáticos para centrar */
    maxWidth: "1200px",
    margin: "0 auto",

  };

  return (
    <div style={layoutStyle}>
      {/* Sidebar siempre visible */}
      <Sidebar />
      {/* Contenedor para el contenido de las rutas hijas */}
      <div style={contentStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
