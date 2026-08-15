import { GoogleGenAI } from "@google/genai";
import config from "../config";

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
