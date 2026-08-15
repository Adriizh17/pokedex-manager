import { NextRequest, NextResponse } from "next/server";
import { config } from "@/config";
import { getSessionToken } from "@/lib/session";

const { API_ENDPOINT } = config;

export async function POST(request: NextRequest) {
	try {
		const token = await getSessionToken();

		if (!token) {
			return NextResponse.json({ error: "No autenticado" }, { status: 401 });
		}

		const formData = await request.formData();
		const file = formData.get("image");

		if (!(file instanceof File)) {
			return NextResponse.json(
				{ error: "Se requiere una imagen" },
				{ status: 400 }
			);
		}

		const buffer = Buffer.from(await file.arrayBuffer());

		const response = await fetch(`${API_ENDPOINT}/pokemon/analyze-image`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				image: buffer.toString("base64"),
				mimeType: file.type,
			}),
			cache: "no-store",
		});

		const data = await response.json();

		return NextResponse.json(data, { status: response.status });
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{ error: "Error al analizar la imagen" },
			{ status: 500 }
		);
	}
}
