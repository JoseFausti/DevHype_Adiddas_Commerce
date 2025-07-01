import {z} from 'zod';

export const loginSchema = z.object({
  username: z.string()
    .min(1, { message: "El nombre es requerido" }),
  password: z.string()
    .min(1, { message: "La contraseña es requerida" })
    // Contraseña con al menos 8 caracteres, una mayúscula, un número y un símbolo
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
      { message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo" }
    )
});


export const registerSchema = z.object({
  username: z.string().min(4, { message: "El nombre de usuario es requerido y debe tener al menos 4 caracteres" }),
  name: z.string().min(1, { message: "El nombre es requerido" }),
  surname: z.string().min(1, { message: "El apellido es requerido" }),
  email: z.string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "El email no es válido" }),
  password: z.string()
    // Contraseña con al menos 8 caracteres, una mayúscula, un número y un símbolo
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
      { message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo" }
    ),
  confirmPassword: z.string().min(1, { message: "Confirmar contraseña" })
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Las contraseñas no coinciden",
});

export const adminProductFormSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),

  image: z
  .any()
  .refine(
    (file) => typeof file === "string" || file instanceof File,
    { message: "Debe subir una imagen válida" }
  ),

  description: z.string().min(1, "Descripción requerida"),
  brand: z.string().min(1, "Marca requerida"),

  price: z.preprocess((val) => {
    if (typeof val === "string") {
      if (val.includes(",")) {
        return undefined; // Rechaza si tiene coma
      }
      const parsed = parseFloat(val);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, 
  z.number().min(0.01, "El precio debe ser mayor a 0")),

  categoryName: z.string().min(1, "Nombre de categoría requerido"),
  typeName: z.string().min(1, "Nombre de tipo requerido"),
  discountPercentages: z.array(
    z.preprocess((val) => {
      if (typeof val === "string") {
        val = val.replace(",", ".");
      }
      const parsed = parseFloat(val as string);
      return isNaN(parsed) ? undefined : parsed;
    }, z.number()
      .min(0, "El descuento debe ser ≥ 0")
      .max(100, "El descuento no puede superar 100"))
  ).optional(),

  productVariants: z.array(z.object({
    sizeNumber: z.number().int().positive("Talle inválido"),
    colorName: z.string().min(1, "Color requerido"),
    stock: z.number().int().min(0, "Stock mínimo 0"),
  }))
});

export const directionSchema = z.object({
  street: z.string().min(1, "La calle es obligatoria"),
  number: z.coerce.number().positive("Debe ser un número positivo"),
  locality: z.string().min(1, "La localidad es obligatoria"),
  city: z.string().min(1, "La ciudad es obligatoria"),
  country: z.string().min(1, "El país es obligatorio"),
  postalCode: z.coerce.number().min(1, "Código postal inválido"),
});

export type DirectionFormData = z.infer<typeof directionSchema>;

export const userSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  surname: z.string().min(1, { message: "El apellido es requerido" }),
  email: z.string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "El email no es válido" }),
  password: z.string()
    // Contraseña con al menos 8 caracteres, una mayúscula, un número y un símbolo
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
      { message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo" }
    )
    .optional(),
  directions: z.array(directionSchema),
});

export const createTypeSchema = z.object({
  name: z.string().min(1, "El nombre del tipo es requerido"),
});

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "El nombre de la categoría es obligatorio"),
  types: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, "El nombre del tipo es obligatorio")
          .regex(/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*$/, "El tipo debe comenzar con mayúscula"),
      })
    )
    .nonempty("Debe haber al menos un tipo")
    .refine((types) => {
      const names = types.map((t) => t.name.trim());
      return new Set(names).size === names.length;
    }, {
      message: "No puede haber tipos duplicados",
    }),
});