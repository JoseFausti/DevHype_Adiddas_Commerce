import styles from "./Products.module.css";
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, TextField, Button, MenuItem, Modal, Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setProductActive } from "../../../../store/slices/productSlice";
import { IProduct } from "../../../../types/types";
import { useCallback, useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { adminProductFormSchema } from "../../../../types/schemas";
import { ErrorMessage } from "formik";
import { updateProduct } from "../../../../data/ProductsController";


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

  const handleSetProductActive = useCallback((product: IProduct) => {
    dispatch(setProductActive(product));
    setOpenModal(true);
  }, [dispatch]);

  return (
    <div className={styles.productsContainer}>
      <div className={styles.productsTitle}>
        <h1>Productos</h1>
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
                  <img
                    src={product.image}
                    alt={product.name}
                    width="50"
                    height="50"
                  />
                </TableCell>
                <TableCell align="center">{product.description}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">${product.price}</TableCell>
                <TableCell align="center">{product.category?.name}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleSetProductActive(product)}>
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

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          {productActive &&
            <Formik
              initialValues={{
                name: productActive.name || "",
                image: productActive.image || "",
                description: productActive.description || "",
                brand: productActive.brand || "",
                price: productActive.price || 0,
                categoryName: productActive.category?.name || "",
                discountPercentages: productActive.discounts?.map(d => d.percentage) || [],
                productVariants: productActive.productVariants?.map(v => ({
                  productName: productActive.name,
                  sizeNumber: v.size.size,
                  colorName: v.color.name,
                  stock: v.stock,
                })) || [],
              }}
              validationSchema={toFormikValidationSchema(adminProductFormSchema)}
              onSubmit={async (values) => {
                const dto = {
                  name: values.name,
                  image: values.image,
                  description: values.description,
                  brand: values.brand,
                  price: values.price,
                  categoryName: values.categoryName,
                  discountPercentages: values.discountPercentages,
                  productVariants: values.productVariants.map(variant => ({
                    productName: values.name,
                    sizeNumber: variant.sizeNumber,
                    colorName: variant.colorName,
                    stock: variant.stock,
                  }))
                };

                try {
                  await updateProduct(productActive.id, dto);
                  setOpenModal(false);
                } catch (error) {
                  console.error("Error al actualizar el producto:", error);
                }
              }}
            >
              {({ values }) => (
                <Form>
                  <h2 style={{ marginBottom: "1rem" }}>Editar Producto</h2>

                  <Field name="name" as={TextField} label="Nombre" fullWidth margin="normal" />
                  <ErrorMessage name="name">{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

                  <Field name="image" as={TextField} label="Imagen URL" fullWidth margin="normal" />
                  <ErrorMessage name="image">{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

                  <Field name="description" as={TextField} label="Descripción" fullWidth margin="normal" />
                  <ErrorMessage name="description">{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

                  <Field name="brand" as={TextField} label="Marca" fullWidth margin="normal" />
                  <ErrorMessage name="brand">{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

                  <Field name="price" as={TextField} type="number" label="Precio" fullWidth margin="normal" />
                  <ErrorMessage name="price">{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

                  <Field name="categoryName" as={TextField} select label="Categoría" fullWidth margin="normal">
                    {["men", "woman", "shoes"].map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage name="categoryName">{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

                  <h4>Descuentos (%)</h4>
                  <FieldArray name="discountPercentages">
                    {({ push, remove }) => (
                      <>
                        {values.discountPercentages.map((_, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                            <Field name={`discountPercentages.${idx}`} as={TextField} type="number" label="%" />
                            <ErrorMessage name={`discountPercentages.${idx}`}>
                              {msg => <div style={{ color: "red" }}>{msg}</div>}
                            </ErrorMessage>
                            <Button onClick={() => remove(idx)} color="error">Eliminar</Button>
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
                          <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                              <Field name={`productVariants.${idx}.sizeNumber`} as={TextField} select label="Talle" style={{ width: 120 }}>
                                {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46].map(size => (
                                  <MenuItem key={size} value={size}>{size}</MenuItem>
                                ))}
                              </Field>
                              <Field name={`productVariants.${idx}.colorName`} as={TextField} select label="Color" style={{ width: 120 }}>
                                {["Red", "Blue", "Green", "Black", "White", "Yellow", "Pink", "Orange", "Purple", "Gray"].map(color => (
                                  <MenuItem key={color} value={color}>{color}</MenuItem>
                                ))}
                              </Field>
                              <Field name={`productVariants.${idx}.stock`} as={TextField} type="number" label="Stock" style={{ width: 100 }} />
                              <Button onClick={() => remove(idx)} color="error">Eliminar</Button>
                            </div>

                            <div style={{ display: "flex", gap: "1rem" }}>
                              <ErrorMessage name={`productVariants.${idx}.sizeNumber`}>
                                {msg => <div style={{ color: "red" }}>{msg}</div>}
                              </ErrorMessage>
                              <ErrorMessage name={`productVariants.${idx}.colorName`}>
                                {msg => <div style={{ color: "red" }}>{msg}</div>}
                              </ErrorMessage>
                              <ErrorMessage name={`productVariants.${idx}.stock`}>
                                {msg => <div style={{ color: "red" }}>{msg}</div>}
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
                      onClick={() => setOpenModal(false)}
                      variant="outlined"
                      sx={{
                        width: '200px',
                        borderColor: 'black',
                        color: 'black',
                        '&:hover': {
                          borderColor: 'black',
                          backgroundColor: 'black',
                          color: 'white',
                        },
                      }}
                    >
                      Cancelar
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        width: '200px',
                        backgroundColor: 'black',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'white',
                          color: 'black',
                        },
                      }}
                    >
                      Guardar Cambios
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          }
        </Box>
      </Modal>
    </div>
  );
};
