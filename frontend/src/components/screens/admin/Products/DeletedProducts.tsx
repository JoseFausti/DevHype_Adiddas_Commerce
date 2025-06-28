import { useCallback, useEffect, useState } from "react";
import { findAllProductsDeleted, restoreProductById } from "../../../../data/ProductsController";
import { IProduct } from "../../../../types/types";
import { Plus } from "lucide-react";
import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import styles from "./Products.module.css";
import { useNavigate } from "react-router-dom";

export const AdminProductsDeleted = () => {
    const [deletedProducts, setDeletedProducts] = useState<IProduct[]>([]);
    const navigate = useNavigate();

    const handleRestoreProduct = useCallback(async (id: number) => {
        try {
            const response = await restoreProductById(id);
            if (response.status === 200 && response.data) {
                setDeletedProducts((prev) => prev.filter((product) => product.id !== id));
            }
        } catch (error) {
            console.error('Error restoring product:', error);
        }
    }, []);

    useEffect(() => {
        const fetchDeletedProducts = async () => {
            try {
                const response = await findAllProductsDeleted();
                if (response.status === 200) {
                    setDeletedProducts(response.data);
                }
            } catch (error) {
                console.error('Error fetching deleted products:', error);
            }
        };

        fetchDeletedProducts();
    }, []);

    return (
        <>
            <div className={styles.productsContainer}>
                <div className={styles.productsTitle}>
                    <h1>Productos</h1>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "1rem" }}>
                    <Button
                        onClick={()=> navigate("/admin/products")}
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
                                <TableCell align="center">Nombre</TableCell>
                                <TableCell align="center">Imagen</TableCell>
                                <TableCell align="center">Descripción</TableCell>
                                <TableCell align="center">Marca</TableCell>
                                <TableCell align="center">Precio</TableCell>
                                <TableCell align="center">Categoría</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deletedProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell align="center">{product.name}</TableCell>
                                    <TableCell align="center">
                                        <img src={product.image} alt={product.name} width={50} height={50} />
                                    </TableCell>
                                    <TableCell align="center">{product.description}</TableCell>
                                    <TableCell align="center">{product.brand}</TableCell>
                                    <TableCell align="center">${product.price}</TableCell>
                                    <TableCell align="center">{product.category?.name}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleRestoreProduct(product.id)} aria-label={`Restaurar ${product.name}`}>
                                            <Plus color="green" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};
