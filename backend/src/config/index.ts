import dotenv from "dotenv";

dotenv.config();

export default {
	PORT: process.env.PORT || 3000,
	POKEDEX_URL: process.env.POKEDEX_URL || "",
	JWT_SECRET: process.env.JWT_SECRET || "secret",
	OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
	GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
	DATABASE_URL: process.env.DATABASE_URL || "",
};
