import { cookies } from "next/headers";
import { config } from "@/config";

const { API_ENDPOINT, SESSION_COOKIE_NAME } = config;

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export type SessionUser = {
	id: number;
	email: string;
	username: string;
	createdAt: string;
};

export async function setSessionCookie(token: string) {
	const cookieStore = await cookies();

	cookieStore.set(SESSION_COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: SESSION_MAX_AGE,
	});
}

export async function clearSessionCookie() {
	const cookieStore = await cookies();
	cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSessionToken() {
	const cookieStore = await cookies();
	return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export async function getCurrentUser(): Promise<SessionUser | null> {
	const token = await getSessionToken();

	if (!token) {
		return null;
	}

	const response = await fetch(`${API_ENDPOINT}/auth/user`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: "no-store",
	});

	if (!response.ok) {
		return null;
	}

	const data = await response.json();
	return data.user as SessionUser;
}
