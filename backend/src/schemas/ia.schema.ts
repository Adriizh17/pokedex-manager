import { z } from "zod";

export const responseImageSchema = z.object({
	name: z.string().describe("Nombre en ingles y todo en minúsculas "),
	text: z.string().describe("Analisis de la imagen"),
});
