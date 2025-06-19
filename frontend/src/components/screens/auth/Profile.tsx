import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { getUserByUsername, updateUser } from "../../../data/UsersController";
import { getDecodedToken } from "../../../utils/functions";
import { ICreateUpdateUser, IDirection, IUser } from "../../../types/types";
import { createDirection } from "../../../data/DirectionsController";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { userSchema } from "../../../types/schemas";

const Profile = () => {
  const token = getDecodedToken();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserByUsername(token!.sub);
        if (response.status === 200) {
          setUser(response.data!);
        } else {
          throw new Error("No se pudo obtener el usuario");
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Cargando datos del usuario...</p>;
  if (!user) return <p>No se pudo cargar el usuario</p>;

  const initialValues = {
    name: user.name || "",
    surname: user.surname || "",
    email: user.email || "",
    password: "",
    directions: user.directions.length > 0 ? user.directions : [{
      street: "",
      number: 0,
      locality: "",
      city: "",
      country: "",
      postalCode: 0,
    }],
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const directionIds: number[] = [];
      const directions: (IDirection | Omit<IDirection, "id">)[] = values.directions;
      for (const direction of directions) {
        if ("id" in direction) {
          // Ya existe, solo se usa su id
          directionIds.push(direction.id);
        } else {
          const res = await createDirection(direction);
          if (res.status === 201) {
            directionIds.push(res.data!.id);
          }
        }
      }

      const updatedUser: ICreateUpdateUser = {
        ...user,
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
        directionIds,
      };

      await updateUser(user.id, updatedUser);
      console.log("Usuario actualizado correctamente");

    } catch (error) {
      console.log("Error actualizando usuario", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Perfil de Usuario</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(userSchema)}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="space-y-4">
            <div>
              <label>Nombre</label>
              <Field name="name" className="input" />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>

            <div>
              <label>Apellido</label>
              <Field name="surname" className="input" />
              <ErrorMessage name="surname" component="div" className="text-red-500" />
            </div>

            <div>
              <label>Email</label>
              <Field name="email" type="email" className="input" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>

            <div>
              <label>Contraseña</label>
              <Field name="password" type="password" className="input" />
            </div>

            <h3 className="text-xl font-semibold mt-6">Direcciones</h3>

            <FieldArray name="directions">
              {({ push, remove }) => (
                <div className="space-y-4">
                  {values.directions.map((_, index) => (
                    <div key={index} className="border p-4 rounded">
                      <div className="grid grid-cols-2 gap-2">
                        <Field name={`directions.${index}.street`} placeholder="Calle" className="input" />
                        <Field name={`directions.${index}.number`} placeholder="Número" type="number" className="input" />
                        <Field name={`directions.${index}.locality`} placeholder="Localidad" className="input" />
                        <Field name={`directions.${index}.city`} placeholder="Ciudad" className="input" />
                        <Field name={`directions.${index}.country`} placeholder="País" className="input" />
                        <Field name={`directions.${index}.postalCode`} placeholder="Código Postal" type="number" className="input" />
                      </div>
                      <button type="button" onClick={() => remove(index)} className="text-red-500 mt-2">
                        Eliminar Dirección
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push({
                    street: "", number: 0, locality: "", city: "", country: "", postalCode: 0
                  })} className="bg-gray-200 px-3 py-1 rounded mt-2">
                    Añadir Dirección
                  </button>
                </div>
              )}
            </FieldArray>

            <button type="submit" className="bg-black text-white px-4 py-2 rounded mt-4">
              Guardar Cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;