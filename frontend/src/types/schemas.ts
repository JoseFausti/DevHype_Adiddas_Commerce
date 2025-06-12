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
  image: z.string().url("Debe ser una URL válida"),
  description: z.string().min(1, "Descripción requerida"),
  brand: z.string().min(1, "Marca requerida"),
  price: z.number().min(0, "El precio debe ser mayor a 0"),
  categoryName: z.string().min(1, "Nombre de categoría requerido"),
  discountPercentages: z.array(
    z.preprocess((val) => {
      if (typeof val === "string") {
        val = val.replace(",", ".");
      }
      const parsed = parseFloat(val as string);
      // Si no es un número válido, devolvemos undefined (falla la validación)
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
