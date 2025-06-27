import { useCallback, useEffect, useState } from "react";
import { ICategory } from "../../../../types/types";
import { useNavigate } from "react-router-dom";
import { restoreTypeById } from "../../../../data/TypesController";
import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import styles from "./Categories.module.css";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import { getAllCategoriesWithTypesDeleted } from "../../../../data/CategoriesController";

const CategoriesDeleted = () => {

    const [deletedTypesCategories, setDeletedTypesCategories] = useState<ICategory[]>([]);
    const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleRestoreType = useCallback(async (id: number, category: ICategory) => {
        try {
            const response = await restoreTypeById(id);
            if (response.status === 200 && response.data) {
                setDeletedTypesCategories(deletedTypesCategories.map(cat => cat.id === category.id 
                    ? { ...cat, types: cat.types?.filter(type => type.id !== id) } 
                    : cat
                ));
            }
        } catch (error) {
            console.error('Error restoring type:', error);
        }
    }, []);

    useEffect(() => {
        const fetchCategoriesWithDeletedTypes = async () => {
            try {
                const response = await getAllCategoriesWithTypesDeleted();
                if (response.status === 200) {
                    setDeletedTypesCategories(response.data);
                }
            } catch (error) {
                console.error('Error fetching deleted products:', error);
            }
        };

        fetchCategoriesWithDeletedTypes();
    }, []);

    const toggleExpand = (id: number) => {
        setExpandedCategoryId(prev => prev === id ? null : id);
    }

    return (
        <div className={styles.categoriesContainer}>
            <div className={styles.categoriesTitle}>
                <h1>Categorias</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <Button
                    onClick={() => navigate("/admin/categories")}
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
                            <TableCell align="center">Secciones</TableCell>
                            <TableCell align="center">Categorias</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {deletedTypesCategories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell align="center">{category.name}</TableCell>
                            <TableCell align="center">
                                {expandedCategoryId === category.id ? (
                                    category.types?.length ? (
                                       <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: "0.3rem" }}>
                                        {category.types.map((type) => (
                                            <div
                                            key={type.id}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                width: "100%",
                                                padding: "0.2rem 0.5rem",
                                            }}
                                            >
                                            <span style={{ textAlign: "left" }}>{type.name}</span>
                                            <IconButton size="small" onClick={() => handleRestoreType(type.id, category)}>
                                                <Plus color="green" />
                                            </IconButton>
                                            </div>
                                        ))}
                                        </div>

                                    ) : (
                                        <em>No hay Categorias</em>
                                    )
                                ) : null}
                            </TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => toggleExpand(category.id)}>
                                {
                                    expandedCategoryId === category.id ? (
                                        <ArrowUp color="red" />
                                    ) : (
                                        <ArrowDown color="green" />
                                    )
                                }
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CategoriesDeleted
