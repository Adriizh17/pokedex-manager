"use server";

import { redirect } from "next/navigation";
import { config } from "@/config";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";
import { clearSessionCookie, setSessionCookie } from "@/lib/session";

const { API_ENDPOINT } = config;

export type AuthState = {
	success: boolean;
	message: string;
};

export async function login(
	state: AuthState,
	formData: FormData
): Promise<AuthState> {
	const parsed = loginSchema.safeParse(Object.fromEntries(formData));
	if (!parsed.success) {
		return {
			success: false,
			message: parsed.error.issues[0].message,
		};
	}

	const { email, password } = parsed.data;

	let token: string;

	try {
		const response = await fetch(`${API_ENDPOINT}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();

		if (!response.ok) {
			return {
				success: false,
				message: data.message ?? "Ocurrió un error al iniciar sesión",
			};
		}

		token = data.token;
	} catch {
		return {
			success: false,
			message: "Ocurrio un error, intentalo de nuevo",
		};
	}

	await setSessionCookie(token);
	redirect("/dashboard");
}

export async function logout() {
	await clearSessionCookie();
	redirect("/");
}

export async function registro(
	state: AuthState,
	formData: FormData
): Promise<AuthState> {
	let token: string;

	const parsed = registerSchema.safeParse(Object.fromEntries(formData));
	if (!parsed.success) {
		return {
			success: false,
			message: parsed.error.issues[0].message,
		};
	}

	const { email, password, username } = parsed.data;

	try {
		const response = await fetch(`${API_ENDPOINT}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, username }),
		});

		const data = await response.json();

		if (!response.ok) {
			return {
				success: false,
				message: data.message ?? "Ocurrió un error al registrarse",
			};
		}

		token = data.token;
	} catch {
		return {
			success: false,
			message: "Ocurrio un error, intentalo de nuevo",
		};
	}

	await setSessionCookie(token);
	redirect("/dashboard");
}
