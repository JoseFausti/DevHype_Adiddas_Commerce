import styles from "./Dashboard.module.css"; // Importamos los estilos locales
// Íconos de Material UI para las distintas métricas
import PeopleIcon from "@mui/icons-material/People";
import { useEffect } from "react";
import { getAllUsers } from "../../../../data/UsersController";
import { getAllProducts } from "../../../../data/ProductsController";
import { getDecodedToken } from "../../../../utils/functions";
import { ITokenPayload } from "../../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setProducts } from "../../../../store/slices/productSlice";
import { setUsers } from "../../../../store/slices/userSlice";
import { ShoppingCartIcon } from "lucide-react";
import { Card, CardContent, Typography } from "@mui/material";

const Dashboard: React.FC = () => {

  const token: ITokenPayload | null = getDecodedToken();
  const {sub: username} = token!;

  const dispatch = useAppDispatch();

  const {products} = useAppSelector((state) => state.product);
  const {users} = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await getAllProducts();
        if (response.status === 200) {
          dispatch(setProducts(response.data));
        } else {
          console.error("Error al obtener productos:", response.error);
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    const fetchAllUsers = async () => {
      try {
        const response = await getAllUsers();
        if (response.status === 200) {
          dispatch(setUsers(response.data));
        } else {
          console.error("Error al obtener usuarios:", response.error);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchAllProducts();
    fetchAllUsers();
    
  }, [username]);

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
                value: users.length,
                icon: <PeopleIcon />,
              },
              {
                title: "Productos",
                value: products.length,
                icon: <ShoppingCartIcon />,
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
