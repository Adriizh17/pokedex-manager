import { z } from "zod";

export const registerSchema = z.object({
	email: z
		.string({ error: "El email es necesario." })
		.trim()
		.min(1, "El email es necesario.")
		.email("El email no es válido."),
	username: z
		.string({ error: "El usuario es necesario." })
		.trim()
		.min(1, "El usuario es necesario."),
	password: z
		.string({ error: "La contraseña es necesaria." })
		.min(8, "La contraseña debe ser de al menos 8 caracteres."),
});

export const loginSchema = z.object({
	email: z
		.string({ error: "El email es necesario." })
		.trim()
		.min(1, "El email es necesario.")
		.email("El email no es válido."),
	password: z
		.string({ error: "La contraseña es necesaria." })
		.min(1, "La contraseña es necesaria."),
});
