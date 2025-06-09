import React, { useState } from "react";
import styles from "./Products.module.css";
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Typography, Modal, Box, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Interfaz para definir la estructura de un producto
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Zapatillas Adidas", price: 12000, stock: 15, imageUrl: "https://via.placeholder.com/50" },
    { id: 2, name: "Camiseta Adidas", price: 8000, stock: 30, imageUrl: "https://via.placeholder.com/50" },
    { id: 3, name: "Mochila Adidas", price: 15000, stock: 10, imageUrl: "https://via.placeholder.com/50" }
  ]);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // Abrir modal de edición
  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  return (
    <div className={styles.productsContainer}>
      {/* Título principal */}
      <div className={styles.productsTitle}>
        <h1>Productos</h1>
      </div>

      {/* Tabla de productos */}
      <div className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Imagen</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Precio</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell align="center">
                  <img src={product.imageUrl} alt={product.name} width="50" height="50" />
                </TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">${product.price}</TableCell>
                <TableCell align="center">{product.stock}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEditClick(product)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal de edición */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className={styles.modal}>
          <Typography variant="h6">Editar Producto</Typography>
          <TextField label="Imagen URL" fullWidth value={selectedProduct?.imageUrl || ""} />
          <TextField label="Nombre" fullWidth value={selectedProduct?.name || ""} />
          <TextField label="Precio" type="number" fullWidth value={selectedProduct?.price || ""} />
          <TextField label="Stock" type="number" fullWidth value={selectedProduct?.stock || ""} />
          <Button variant="contained" color="primary">Guardar cambios</Button>
        </Box>
      </Modal>
    </div>
  );
};

