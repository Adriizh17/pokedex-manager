import { Request, Response } from "express";
import { authService } from "../services/auth";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const register = async (req: Request, res: Response) => {
	try {
		const parsed = registerSchema.safeParse(req.body);

		if (!parsed.success) {
			return res.status(400).json({
				message: parsed.error.issues[0].message,
			});
		}

		const user = await authService.register(parsed.data);

		return res.status(201).json({
			user,
		});
	} catch (error) {
		if (error instanceof Error && error.message === "USER_ALREADY_EXISTS") {
			return res.status(409).json({
				message: "El usuario ya existe, inicia sesión.",
			});
		}

		console.error(error);

		return res.status(400).json({
			message: "Ocurrio un error, intentalo de nuevo",
		});
	}
};

const login = async (req: Request, res: Response) => {
	try {
		const parsed = loginSchema.safeParse(req.body);

		if (!parsed.success) {
			return res.status(400).json({
				message: parsed.error.issues[0].message,
			});
		}

		const result = await authService.login(parsed.data);

		return res.status(200).json(result);
	} catch (error) {
		if (error instanceof Error && error.message === "USER_NO_EXIST") {
			return res.status(401).json({
				message: "El usuario no existe.",
			});
		}
		if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
			return res.status(401).json({
				message: "La contraseña es incorrecta, intentalo de nuevo.",
			});
		}

		console.error(error);

		return res.status(400).json({
			message: "Ocurrio un error, intentalo de nuevo",
		});
	}
};

export default {
	login,
	register,
};
