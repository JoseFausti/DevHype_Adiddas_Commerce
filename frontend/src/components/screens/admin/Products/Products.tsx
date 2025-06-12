import styles from "./Products.module.css";
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setProductActive } from "../../../../store/slices/productSlice";
import { IProduct } from "../../../../types/types";
import { useCallback, useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { adminProductFormSchema } from "../../../../types/schemas";

// Variantes para ver los productos
export const AdminProducts: React.FC = () => {

  const { products, productActive } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSetProductActive = useCallback((product: IProduct) => {
    if (product) {
      dispatch(setProductActive(product));
    }
  }, [dispatch]);

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
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Imagen</TableCell>
              <TableCell align="center">Descripcion</TableCell>
              <TableCell align="center">Marca</TableCell>
              <TableCell align="center">Precio</TableCell>
              <TableCell align="center">Categoria</TableCell>
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
                <TableCell align="center">{product.category.name}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      handleSetProductActive(product);
                      setOpenModal(true);
                    }}
                  >
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

      {openModal && productActive && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <Formik
              initialValues={{
                name: productActive?.name ?? "",
                image: productActive?.image ?? "",
                description: productActive?.description ?? "",
                brand: productActive?.brand ?? "",
                price: productActive?.price ?? 0,
                categoryId: productActive?.category?.id ?? 0,
                discountIds: productActive?.discounts?.map((d) => d.id) ?? [],
                productVariants:
                  productActive?.productVariants?.map((v) => ({
                    productId: productActive.id,
                    sizeId: v.size.id,
                    colorId: v.color.id,
                    stock: v.stock,
                  })) ?? [],
              }}
              validationSchema={toFormikValidationSchema(adminProductFormSchema)}
              onSubmit={(values) => {
                // Aquí haces el PUT al backend con values
                console.log("Submit DTO", values);
              }}
            >
              {({ values }) => (
                <Form className={styles.modalForm}>
                  <div className={styles.modalHeader}>
                    <h2>EDITAR PRODUCTO</h2>
                  </div>

                  {/* Sección en dos columnas */}
                  <div className={styles.formRow}>
                    <div className={styles.formColumn}>
                      <Field
                        name="name"
                        as={TextField}
                        label="Nombre"
                        fullWidth
                        className={styles.inputField}
                      />
                      <Field
                        name="image"
                        as={TextField}
                        label="Imagen URL"
                        fullWidth
                        className={styles.inputField}
                      />
                      <Field
                        name="description"
                        as={TextField}
                        label="Descripción"
                        fullWidth
                        className={styles.inputField}
                      />
                    </div>
                    <div className={styles.formColumn}>
                      <Field
                        name="brand"
                        as={TextField}
                        label="Marca"
                        fullWidth
                        className={styles.inputField}
                      />
                      <Field
                        name="price"
                        as={TextField}
                        type="number"
                        label="Precio"
                        fullWidth
                        className={styles.inputField}
                      />
                      <Field
                        name="categoryId"
                        as={TextField}
                        label="Categoría ID"
                        fullWidth
                        className={styles.inputField}
                      />
                    </div>
                  </div>

                  {/* Sección de variantes */}
                  <div className={styles.variantSection}>
                    <FieldArray name="productVariants">
                      {({ push, remove }) => (
                        <div className={styles.variantContainer}>
                          {values.productVariants.map((variant, index) => (
                            <div key={index} className={styles.variantRow}>
                              <Field
                                name={`productVariants.${index}.sizeId`}
                                as={TextField}
                                label="Size ID"
                                className={styles.inputField}
                              />
                              <Field
                                name={`productVariants.${index}.colorId`}
                                as={TextField}
                                label="Color ID"
                                className={styles.inputField}
                              />
                              <Field
                                name={`productVariants.${index}.stock`}
                                as={TextField}
                                label="Stock"
                                className={styles.inputField}
                              />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                Eliminar
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              push({
                                productId: productActive.id,
                                sizeId: 0,
                                colorId: 0,
                                stock: 0,
                              })
                            }
                            className={styles.addVariantButton}
                          >
                            Agregar Variante
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  {/* Sección de botones de acción */}
                  <div className={styles.actionRow}>
                    <Button
                      type="submit"
                      variant="contained"
                      className={styles.saveButtonCustom}
                    >
                      GUARDAR CAMBIOS
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setOpenModal(false)}
                      className={styles.closeButtonCustom}
                    >
                      CERRAR
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};
