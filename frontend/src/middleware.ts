import { NextRequest, NextResponse } from "next/server";
import { config as conf } from "@/config";

const { SESSION_COOKIE_NAME } = conf;
const authRoutes = ["/login", "/registro"];

export function middleware(request: NextRequest) {
	const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
	const { pathname } = request.nextUrl;

	if (token && authRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/login", "/registro"],
};
