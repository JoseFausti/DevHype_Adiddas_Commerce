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
  
  const {products, productActive} = useAppSelector((state) => state.product);
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
                  <img src={product.image} alt={product.name} width="50" height="50" />
                </TableCell>
                <TableCell align="center">{product.description}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">${product.price}</TableCell>
                <TableCell align="center">{product.category.name}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => {handleSetProductActive(product); setOpenModal(true);}}>
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

      {openModal && productActive &&
        <Formik
          initialValues={{
            name: productActive?.name ?? "",
            image: productActive?.image ?? "",
            description: productActive?.description ?? "",
            brand: productActive?.brand ?? "",
            price: productActive?.price ?? 0,
            categoryId: productActive?.category?.id ?? 0,
            discountIds: productActive?.discounts?.map(d => d.id) ?? [],
            productVariants: productActive?.productVariants?.map(v => ({
              productId: productActive.id,
              sizeId: v.size.id,
              colorId: v.color.id,
              stock: v.stock,
            })) ?? []
          }}
          validationSchema={toFormikValidationSchema(adminProductFormSchema)}
          onSubmit={(values) => {
            // Aquí haces el PUT al backend con values
            console.log("Submit DTO", values);
          }}
        >
          {({ values }) => (
            <Form>
              <div>
                <h2>Editar Producto</h2>
                <Button variant="outlined" onClick={() => setOpenModal(false)}>Cerrar</Button>
              </div>
              <Field name="name" as={TextField} label="Nombre" fullWidth />
              <Field name="image" as={TextField} label="Imagen URL" fullWidth />
              <Field name="description" as={TextField} label="Descripción" fullWidth />
              <Field name="brand" as={TextField} label="Marca" fullWidth />
              <Field name="price" as={TextField} type="number" label="Precio" fullWidth />
              <Field name="categoryId" as={TextField} label="Categoría ID" fullWidth />
              {/* Agrega select para discountIds si los tenés disponibles */}
              
              <FieldArray name="productVariants">
                {({ push, remove }) => (
                  <div>
                    {values.productVariants.map((variant, index) => (
                      <div key={index}>
                        <Field name={`productVariants.${index}.sizeId`} as={TextField} label="Size ID" />
                        <Field name={`productVariants.${index}.colorId`} as={TextField} label="Color ID" />
                        <Field name={`productVariants.${index}.stock`} as={TextField} label="Stock" />
                        <button type="button" onClick={() => remove(index)}>Eliminar</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push({ productId: productActive.id, sizeId: 0, colorId: 0, stock: 0 })}>Agregar Variante</button>
                  </div>
                )}
              </FieldArray>

              <Button type="submit" variant="contained">Guardar cambios</Button>
            </Form>
          )}
        </Formik>
      }
    </div>
  );
};