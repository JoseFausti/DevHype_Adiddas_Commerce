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
