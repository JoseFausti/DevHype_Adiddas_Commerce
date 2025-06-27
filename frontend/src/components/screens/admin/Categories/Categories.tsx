import { Box, Button, IconButton, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material"
import styles from "./Categories.module.css"
import { ArrowDown, ArrowUp, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { ICategory } from "../../../../types/types"
import { getAllCategories } from "../../../../data/CategoriesController"
import { deleteTypeById } from "../../../../data/TypesController"
import { Formik } from "formik"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { Form, useNavigate } from "react-router-dom"

const Categories = () => {

    const modalStyle = {
        color: "black",
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        maxHeight: "90vh",
        overflowY: "auto",
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
    };

    const [openModal, setOpenModal] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                if (response.status === 200) {
                    setCategories(response.data);
                } else {
                    throw new Error();
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []);

    const toggleExpand = (id: number) => {
        setExpandedCategoryId(prev => prev === id ? null : id);
    }

    const handleDeleteType = async (id: number, category: ICategory) => {
        try {
            await deleteTypeById(id);
            setCategories(
                categories.map(cat => cat.id === category.id 
                    ? { ...cat, types: cat.types?.filter(type => type.id !== id) } 
                    : cat
            ));
        } catch (error) {
            console.error("Error deleting type:", error);
        }
    };

    return (
        <div className={styles.categoriesContainer}>
            <div className={styles.categoriesTitle}>
                <h1>Categorias</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <Button
                    onClick={() => navigate("/admin/categories/deleted")}
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
                    Categorias Eliminadas
                </Button>
                <Button
                    onClick={() => setOpenModal(true)}
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
                    Crear Categoria
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
                    {categories.map((category) => (
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
                                            <IconButton size="small" onClick={() => handleDeleteType(type.id, category)}>
                                                <Trash size={16} color="red" />
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

                {/* <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box sx={modalStyle}>
                        <Formik
                            enableReinitialize
                            validationSchema= {toFormikValidationSchema(categorySchema)}
                            initialValues={{
                            
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                const response = await createCategory(values);
                                if (response.status === 201) {
                                    setCategories([...categories, response.data!]);
                                    setOpenModal(false);
                                } else {
                                    throw new Error();
                                }
                            } catch (err) {
                                console.error("Error creating category:", err);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                        >
                            <Form>
                                <TextField
                                    label="Nombre"
                                    name="name"
                                    type="text"
                                    fullWidth
                                />
                                <Button
                                    type="submit"
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
                                    Crear
                                </Button>
                            </Form>
                        </Formik>
                    </Box>

                </Modal> */}
            </div>
        </div>
    )
}

export default Categories;
