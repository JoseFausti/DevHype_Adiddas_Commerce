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
  categoryId: z.number().int().positive("Categoría requerida"),
  discountIds: z.array(z.number().int()).optional(),
  productVariants: z.array(z.object({
    productId: z.number().int(),
    sizeId: z.number().int(),
    colorId: z.number().int(),
    stock: z.number().int().min(0, "Stock mínimo 0"),
  }))
});