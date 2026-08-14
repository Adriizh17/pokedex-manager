import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { LoginInput, RegisterInput } from "../types/auth.types";
import config from "../config";

const { JWT_SECRET } = config;

export const authService = {
	async register({ email, username, password }: RegisterInput) {
		const normalizedEmail = email.trim().toLowerCase();
		const normalizedUsername = username.trim().toLowerCase();

		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ email: normalizedEmail }, { username: normalizedUsername }],
			},
		});

		if (existingUser) {
			throw new Error("USER_ALREADY_EXISTS");
		}

		const passwordHash = await bcrypt.hash(password, 12);

		const user = await prisma.user.create({
			data: {
				email: normalizedEmail,
				username: normalizedUsername,
				password: passwordHash,
			},
		});

		return {
			id: user.id,
			email: user.email,
			username: user.username,
		};
	},

	async login({ email, password }: LoginInput) {
		const normalizedEmail = email.trim().toLowerCase();

		const user = await prisma.user.findUnique({
			where: {
				email: normalizedEmail,
			},
		});

		if (!user) {
			throw new Error("USER_NO_EXIST");
		}

		const passwordMatches = await bcrypt.compare(password, user.password);

		if (!passwordMatches) {
			throw new Error("INVALID_CREDENTIALS");
		}

		const token = jwt.sign(
			{
				sub: user.id,
				email: user.email,
			},
			JWT_SECRET,
			{
				expiresIn: "7d",
			}
		);

		return {
			token,
			user: {
				id: user.id,
				email: user.email,
			},
		};
	},
};
