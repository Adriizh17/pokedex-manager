import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedUser } from "../types/auth.types";
import config from "../config";

const { JWT_SECRET } = config;

declare global {
	namespace Express {
		interface Request {
			user?: AuthenticatedUser;
		}
	}
}

interface JwtPayload {
	sub: string;
	email: string;
}

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authorization = req.headers.authorization;

	if (!authorization?.startsWith("Bearer ")) {
		return res.status(401).json({
			message: "Se necesita la autenticación",
		});
	}

	const token = authorization.split(" ")[1];

	try {
		const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

		req.user = {
			id: Number(payload.sub),
			email: payload.email,
		};

		next();
	} catch {
		return res.status(401).json({
			message: "Token invalido",
		});
	}
};
