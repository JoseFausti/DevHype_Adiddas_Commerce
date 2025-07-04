import styles from "./Products.module.css";
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, TextField, Button, MenuItem, Modal, Box,
  Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { addProduct, editProduct, setProductActive, setProducts } from "../../../../store/slices/productSlice";
import { ICategory, IColor, ICreateUpdateProduct, IProduct, ISize, IType } from "../../../../types/types";
import { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { adminProductFormSchema } from "../../../../types/schemas";
import { ErrorMessage } from "formik";
import { createProduct, updateProduct, deleteProductById, getAllProducts } from "../../../../data/ProductsController";
import { UploadImageController } from "../../../../data/ImageController";
import { getAllCategories } from "../../../../data/CategoriesController";
import { getAllTypes } from "../../../../data/TypesController";
import { getAllSizes } from "../../../../data/SizesController";
import { getAllColors } from "../../../../data/ColorsController";
import { useNavigate } from "react-router-dom";

// Estilos del modal
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

export const AdminProducts: React.FC = () => {
  const { products, productActive } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const navigate = useNavigate();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const categoriesNames = Array.from(new Set(categories.map((category) => category.name)));

  const [types, setTypes] = useState<IType[]>([]);
  const typesNames = Array.from(new Set(types.map((type) => type.name)));

  const [sizes, setSizes] = useState<ISize[]>([]);
  const sizesNumbers = Array.from(new Set(sizes.map((size) => size.size)));

  const [colors, setColors] = useState<IColor[]>([]);
  const colorsNames = Array.from(new Set(colors.map((color) => color.name)));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        if (response.status === 200) {
          dispatch(setProducts(response.data));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();

    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();

    const fetchTypes = async () => {
      try {
        const response = await getAllTypes();
        if (response.status === 200) {
          setTypes(response.data);
        }
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };
    fetchTypes();

    const fetchSizes = async () => {
      try {
        const response = await getAllSizes();
        if (response.status === 200) {
          setSizes(response.data);
        }
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };
    fetchSizes();

    const fetchColors = async () => {
      try {
        const response = await getAllColors();
        if (response.status === 200) {
          setColors(response.data);
        }
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };
    fetchColors();
   
  }, [dispatch]);

  const handleAddProduct = () => {
    dispatch(setProductActive(null)); // limpiamos producto activo
    setIsEditing(false);
    setOpenModal(true);
  };

  const handleEditProduct = (product: IProduct) => {
    dispatch(setProductActive(product));
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(setProductActive(null));
    setLoadingSubmit(false);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProductById(productToDelete.id);
      setOpenDeleteDialog(false);
      setProductToDelete(null);
      // Podrías agregar acción para recargar lista si es necesario
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  return (
    <div className={styles.productsContainer}>
      <div className={styles.productsTitle}>
        <h1>Productos</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <Button
          onClick={() => navigate("/admin/products/deleted")}
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
          Productos Eliminados
        </Button>
        <Button
          onClick={handleAddProduct}
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
          Añadir Producto
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
            {products.map((product: IProduct) => (
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
                  <IconButton onClick={() => {handleEditProduct(product)}} aria-label={`Editar ${product.name}`}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={async () => {
                      if (product.id) {
                        try {
                          await deleteProductById(product.id);
                          // Recargar productos para actualizar la lista
                          const response = await getAllProducts();
                          if (response.status === 200) {
                            dispatch(setProducts(response.data));
                          }
                        } catch (error) {
                          console.error("Error eliminando producto:", error);
                        }
                      }
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Formik
            enableReinitialize
            initialValues={{
              name: productActive?.name || "",
              image: productActive?.image || File,
              description: productActive?.description || "",
              brand: productActive?.brand || "",
              price: productActive?.price || 0,
              categoryName: productActive?.category?.name || "",
              typeName: productActive?.type?.name || "",
              discountPercentages: productActive?.discounts?.map((d) => d.percentage) || [],
              productVariants:
                productActive?.productVariants?.map((v) => ({
                  productName: productActive?.name || "",
                  sizeNumber: v.size.size,
                  colorName: v.color.name,
                  stock: v.stock,
                })) || [],
            }}
            validationSchema={toFormikValidationSchema(adminProductFormSchema)}

            onSubmit={async (values, { setSubmitting }) => {
              try {
                setLoadingSubmit(true);

                // Subir imagen solo si es un nuevo archivo
                if (values.image instanceof File) {
                  const upload = await UploadImageController(values.image);
                  if (upload.status === 200 && upload.data) {
                    values.image = upload.data; // reemplazamos por URL
                  } else {
                    throw new Error("Error al subir la imagen");
                  }
                }

                const dto: ICreateUpdateProduct = {
                  name: values.name,
                  image: values.image.toString(),
                  description: values.description,
                  brand: values.brand,
                  price: values.price,
                  categoryName: values.categoryName,
                  typeName: values.typeName,
                  discountPercentages: values.discountPercentages,
                  productVariants: values.productVariants.map((variant) => ({
                    productName: values.name,
                    sizeNumber: variant.sizeNumber,
                    colorName: variant.colorName,
                    stock: variant.stock,
                  })),
                };

                let response;
                if (isEditing && productActive) {
                  response = await updateProduct(productActive.id, dto);
                  if (response.status === 200 && response.data) {
                    dispatch(editProduct(response.data));
                  } else {
                    throw new Error("Error al editar producto");
                  }
                } else {
                  response = await createProduct(dto);
                  if (response.status === 201 && response.data) {
                    dispatch(addProduct(response.data));
                  } else {
                    throw new Error("Error al crear producto");
                  }
                }

                handleCloseModal();
              } catch (error) {
                console.error("Error al enviar formulario:", error);
              } finally {
                setSubmitting(false);
                setLoadingSubmit(false);
              }
            }
          }
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form>
                <h2 style={{ marginBottom: "1rem" }}>{isEditing ? "Editar Producto" : "Crear Producto"}</h2>

                <Field name="name" as={TextField} label="Nombre" fullWidth margin="normal" />
                <ErrorMessage name="name">{(msg) => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

                {typeof values.image === "string" && (
                  <div style={{ margin: "0.5rem 0" }}>
                    <img src={values.image} alt="Imagen actual" width={100} height={100} />
                    <p style={{ fontSize: "0.8rem" }}>Imagen actual</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.currentTarget.files && e.currentTarget.files[0]) {
                      setFieldValue("image", e.currentTarget.files[0]);
                    }
                  }}
                  style={{ margin: "1rem 0", display: "block" }}
                />
                <ErrorMessage name="image">{(msg) => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

                <Field name="description" as={TextField} label="Descripción" fullWidth margin="normal" />
                <ErrorMessage name="description">{(msg) => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

                <Field name="brand" as={TextField} label="Marca" fullWidth margin="normal" />
                <ErrorMessage name="brand">{(msg) => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

                <Field name="price" as={TextField} type="decimal" label="Precio" fullWidth margin="normal" />
                <ErrorMessage name="price">{(msg) => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

                <Field name="categoryName" as={TextField} select label="Categoría" fullWidth margin="normal">
                  {[...categoriesNames].map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="categoryName">{(msg) => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

                <Field name="typeName" as={TextField} select label="Tipo" fullWidth margin="normal">
                  {[...typesNames].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="typeName">{(msg) => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

                <h4>Descuentos (%)</h4>
                <FieldArray name="discountPercentages">
                  {({ push, remove }) => (
                    <>
                      {values.discountPercentages.map((_, idx) => (
                        <div
                          key={idx}
                          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}
                        >
                          <Field name={`discountPercentages.${idx}`} as={TextField} type="number" label="%" />
                          <ErrorMessage name={`discountPercentages.${idx}`}>
                            {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                          </ErrorMessage>
                          <Button onClick={() => remove(idx)} color="error">
                            Eliminar
                          </Button>
                        </div>
                      ))}
                      <Button onClick={() => push(0)}>Agregar Descuento</Button>
                    </>
                  )}
                </FieldArray>

                <h4 style={{ marginTop: "1rem" }}>Variantes</h4>
                <FieldArray name="productVariants">
                  {({ push, remove }) => (
                    <>
                      {values.productVariants.map((_, idx) => (
                        <div
                          key={idx}
                          style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}
                        >
                          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                            <Field name={`productVariants.${idx}.sizeNumber`} as={TextField} select label="Talle" style={{ width: 120 }}>
                              {[...sizesNumbers].map((size) => (
                                <MenuItem key={size} value={size}>
                                  {size}
                                </MenuItem>
                              ))}
                            </Field>
                            <Field name={`productVariants.${idx}.colorName`} as={TextField} select label="Color" style={{ width: 120 }}>
                              {[...colorsNames].map(
                                (color) => (
                                  <MenuItem key={color} value={color}>
                                    {color}
                                  </MenuItem>
                                )
                              )}
                            </Field>
                            <Field name={`productVariants.${idx}.stock`} as={TextField} type="number" label="Stock" style={{ width: 100 }} />
                            <Button onClick={() => remove(idx)} color="error">
                              Eliminar
                            </Button>
                          </div>

                          <div style={{ display: "flex", gap: "1rem" }}>
                            <ErrorMessage name={`productVariants.${idx}.sizeNumber`}>
                              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                            </ErrorMessage>
                            <ErrorMessage name={`productVariants.${idx}.colorName`}>
                              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                            </ErrorMessage>
                            <ErrorMessage name={`productVariants.${idx}.stock`}>
                              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                            </ErrorMessage>
                          </div>
                        </div>
                      ))}
                      <Button onClick={() => push({ sizeNumber: 0, colorName: "", stock: 0 })}>Agregar Variante</Button>
                    </>
                  )}
                </FieldArray>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
                  <Button
                    onClick={handleCloseModal}
                    variant="outlined"
                    sx={{
                      width: "200px",
                      borderColor: "black",
                      color: "black",
                      "&:hover": {
                        borderColor: "black",
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                    disabled={loadingSubmit || isSubmitting}
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
                    disabled={loadingSubmit || isSubmitting}
                  >
                    {isEditing ? "Guardar Cambios" : "Crear Producto"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      {/* Dialogo de confirmación para borrar */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro que quieres eliminar el producto{" "}
          <strong>{productToDelete?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
