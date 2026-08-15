import { GoogleGenAI, createPartFromBase64, createUserContent } from "@google/genai";
import { z } from "zod";
import config from "../config";
import { responseImageSchema } from "../schemas/ia.schema";

const { GEMINI_API_KEY } = config;

export const generateText = async (prompt: string) => {
	try {
		const ai = new GoogleGenAI({
			apiKey: GEMINI_API_KEY,
		});

		try {
			const response = await ai.models.generateContent({
				model: "gemini-3.1-flash-lite",
				contents: prompt,
			});

			return response.text;
		} catch (error) {
			console.log(error);
			return false;
		}
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const identifyPokemonFromImage = async (
	base64Image: string,
	mimeType: string
) => {
	try {
		const ai = new GoogleGenAI({
			apiKey: GEMINI_API_KEY,
		});

		const prompt = `Analiza esta imagen e identifica qué Pokémon aparece en ella. Responde con el nombre del Pokémon en inglés y en minúsculas tal como aparece en la PokeAPI (por ejemplo pikachu o mr-mime), y un análisis de la imagen donde menciones el Pokémon, sus características y curiosidades. Si no logras identificar con confianza ningún Pokémon en la imagen, responde con "unknown" como nombre y explica en el texto que no se pudo identificar ningún Pokémon.`;

		try {
			const response = await ai.models.generateContent({
				model: "gemini-3.1-flash-lite",
				contents: createUserContent([
					prompt,
					createPartFromBase64(base64Image, mimeType),
				]),
                config: {
					temperature: 0.5,
					responseMimeType: "application/json",
					responseJsonSchema: z.toJSONSchema(responseImageSchema),
				},
			});

			const raw = response.text?.trim() ?? "";
			const cleaned = raw.replace(/^```json\s*|^```\s*|```$/g, "").trim();
			const parsed = JSON.parse(cleaned);

			if (
				typeof parsed.name !== "string" ||
				typeof parsed.text !== "string" ||
				parsed.name.toLowerCase().trim() === "unknown"
			) {
				return null;
			}

			return { name: parsed.name, text: parsed.text };
		} catch (error) {
			console.log(error);
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};
