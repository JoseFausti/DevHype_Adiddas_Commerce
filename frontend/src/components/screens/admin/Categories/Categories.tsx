import { Box, Button, IconButton, MenuItem, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material"
import styles from "./Categories.module.css"
import { ArrowDown, ArrowUp, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { ICategory } from "../../../../types/types"
import { findCategoryByName, getAllCategories, updateCategory } from "../../../../data/CategoriesController"
import { createType, deleteTypeById, getAllTypesByCategoryId } from "../../../../data/TypesController"
import { ErrorMessage, Field, FieldArray, Formik, Form } from "formik"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { useNavigate } from "react-router-dom"
import { createCategorySchema } from "../../../../types/schemas"

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
    }, [openModal === false]);

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

    const handleCloseModal = () => {
        setOpenModal(false);
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

                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box sx={modalStyle}>
                        <Formik
                        enableReinitialize
                        initialValues={{
                            name: "",
                            types: [{ name: "" }],
                        }}
                        validationSchema={toFormikValidationSchema(createCategorySchema)}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                            const capitalize = (str: string) => 
                                str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

                            const categoryResponse = await findCategoryByName(values.name);
                            const categoryId = categoryResponse.data!.id;

                            const existingTypesResponse = await getAllTypesByCategoryId(categoryId);
                            const existingTypeNames = existingTypesResponse.data.map((t) => t.name.toLowerCase());

                            const normalizedExistingNames = existingTypeNames.map((name) =>
                                capitalize(name.trim())
                            );

                            const newTypes = values.types
                                .map((type) => ({
                                    name: capitalize(type.name.trim()),
                                }))
                                .filter(
                                    (type) => !normalizedExistingNames.includes(type.name)
                                );

                            // Insertás capitalizados
                            for (const newType of newTypes) {
                                await createType({ name: newType.name, categoryId });
                            }

                            const updatedTypesResponse = await getAllTypesByCategoryId(categoryId);
                            const updatedTypes = updatedTypesResponse.data;

                            const dto: ICategory = {
                                id: categoryId,
                                name: values.name,
                                types: updatedTypes,
                            };

                            const updateRes = await updateCategory(categoryId, dto);
                            if (updateRes.status === 200) {
                                console.log("Categoría actualizada:", updateRes.data);
                                setOpenModal(false);
                            }
                            } catch (error) {
                            console.error("Error en el envío del formulario", error);
                            } finally {
                            setSubmitting(false);
                            }
                        }}
                        >
                        {({ values, isSubmitting }) => (
                            <Form>
                            <h2 style={{ marginBottom: "1rem" }}>Actualizar Categoría</h2>

                            <Field name="name" as={TextField} select label="Nombre" fullWidth margin="normal">
                                {[...categories].map((cat) => (
                                <MenuItem key={cat.id} value={cat.name}>
                                    {cat.name}
                                </MenuItem>
                                ))}
                            </Field>
                            <ErrorMessage name="name">
                                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                            </ErrorMessage>

                            <h4 style={{ marginTop: "1.5rem" }}>Tipos</h4>
                            <FieldArray name="types">
                                {({ push, remove }) => (
                                <>
                                    {values.types.map((_, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                        marginBottom: "1rem",
                                        }}
                                    >
                                        <Field
                                        name={`types.${idx}.name`}
                                        as={TextField}
                                        label="Nombre del Tipo"
                                        fullWidth
                                        />
                                        <ErrorMessage name={`types.${idx}.name`}>
                                        {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                                        </ErrorMessage>
                                        <Button
                                        onClick={() => remove(idx)}
                                        color="error"
                                        variant="outlined"
                                        >
                                        Eliminar
                                        </Button>
                                    </div>
                                    ))}
                                    <Button
                                    onClick={() => push({ name: "" })}
                                    variant="outlined"
                                    sx={{
                                        borderColor: "black",
                                        color: "black",
                                        "&:hover": {
                                        backgroundColor: "black",
                                        color: "white",
                                        },
                                    }}
                                    >
                                    Agregar Tipo
                                    </Button>
                                </>
                                )}
                            </FieldArray>

                            <div
                                style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "2rem",
                                }}
                            >
                                <Button
                                onClick={handleCloseModal}
                                variant="outlined"
                                sx={{
                                    width: "200px",
                                    borderColor: "black",
                                    color: "black",
                                    "&:hover": {
                                    backgroundColor: "black",
                                    color: "white",
                                    },
                                }}
                                disabled={isSubmitting}
                                >
                                Cancelar
                                </Button>

                                <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    width: "200px",
                                    backgroundColor: "black",
                                    color: "white",
                                    "&:hover": {
                                    backgroundColor: "white",
                                    color: "black",
                                    },
                                }}
                                disabled={isSubmitting}
                                >
                                Guardar Cambios
                                </Button>
                            </div>
                            </Form>
                        )}
                        </Formik>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default Categories;
