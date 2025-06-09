import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css"; // Importamos los estilos locales
import { Card, CardContent, Typography } from "@mui/material"; // Material UI: componentes para tarjetas y tipografía

// Íconos de Material UI para las distintas métricas
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// Importamos componentes de Recharts para el gráfico
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Stats {
  users: number;      // Total de usuarios registrados
  products: number;   // Total de productos disponibles
  orders: number;     // Total de pedidos recientes
  revenue: number;    // Ingresos totales generados
  bestSeller: string; // Nombre del producto más vendido
}

const Dashboard: React.FC = () => {
  // Estado inicial para almacenar las estadísticas obtenidas del backend
  const [stats, setStats] = useState<Stats>({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
    bestSeller: "Cargando...",
  });

  // Datos de ejemplo para el gráfico de ingresos mensuales
  // Estos datos pueden ser reemplazados por los proporcionados por el backend
  const revenueData = [
    { month: "Ene", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Abr", revenue: 4000 },
    { month: "May", revenue: 6000 },
    { month: "Jun", revenue: 7000 },
  ];

  // useEffect se ejecuta una sola vez al montar el componente
  useEffect(() => {
    axios
      .get("/api/admin/stats") // Endpoint que debe devolver las estadísticas
      .then((res) => {
        setStats(res.data); // Actualizamos el estado con los datos recibidos
      })
      .catch((err) => console.error("Error al obtener estadísticas:", err));
  }, []);

  return (
    // Contenedor principal que abarca toda la página
    <div className={styles.pageContainer}>

      {/* Contenedor que envuelve el Sidebar y el contenido principal */}
      <div className={styles.contentContainer}>
        {/* Sección principal del dashboard */}
        <main className={styles.main}>
          <div className={styles.mainTitle}>
            <h1>PANEL DE ADMINISTRACIÓN</h1>
          </div>

          {/* Grid de tarjetas para mostrar las métricas principales */}
          <div className={styles.grid}>
            {[
              {
                title: "Usuarios registrados",
                value: stats.users,
                icon: <PeopleIcon />,
              },
              {
                title: "Productos",
                value: stats.products,
                icon: <ShoppingCartIcon />,
              },
              {
                title: "Ingresos totales",
                value: `$${stats.revenue}`,
                icon: <AttachMoneyIcon />,
              },
            ].map(({ title, value, icon }, index) => (
              <Card key={index} className={styles.card}>
                <CardContent className={styles.cardContent}>
                  {/* Ícono en la parte superior */}
                  <div className={styles.icon}>{icon}</div>
                  {/* Contenedor del texto, donde se muestra el nombre y el valor */}
                  <div className={styles.textContainer}>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body1">{value}</Typography>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gráfico de ingresos debajo de las tarjetas */}
          <div className={styles.chartContainer}>
            {/* Título del gráfico */}
            <Typography variant="h5" align="center" gutterBottom>
              Historial de Ingresos
            </Typography>
            {/* ResponsiveContainer se ajusta al ancho del contenedor */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
