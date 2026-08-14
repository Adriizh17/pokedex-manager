import { Request, Response } from "express";
import prisma from "../lib/prisma";

const userInfo = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				message: "Se requiere autenticación",
			});
		}
		const { id, email } = req.user;

		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				email: true,
				username: true,
				createdAt: true,
			},
		});

		if (!user) {
			return res.status(404).json({
				message: "Usuario no encontrado",
			});
		}

		return res.json({
			user,
		});
	} catch (error) {
		console.error(error);

		return res.status(400).json({
			message: "Ocurrio un error, intentalo de nuevo",
		});
	}
};

const addPokemontoPokedex = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				message: "Se requiere autenticación",
			});
		}
		const { id } = req.user;
		const { pokemonId } = req.body;

		const existPokemon = await prisma.collection.findFirst({
			where: {
				userId: id,
				pokemonId,
			},
		});

		if (existPokemon) {
			return res.status(404).json({
				message: "El Pokemon ya se encuentra en la PokeDex",
			});
		}

		const addPokemon = await prisma.collection.create({
			data: {
				userId: id,
				pokemonId,
			},
		});

		return res.json({
			addPokemon,
		});
	} catch (error) {
		console.error(error);

		return res.status(400).json({
			message: "Ocurrio un error, intentalo de nuevo",
		});
	}
};

const myPokedex = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				message: "Se requiere autenticación. ",
			});
		}
		const { id } = req.user;

		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				email: true,
				username: true,
				createdAt: true,
			},
		});

		if (!user) {
			return res.status(404).json({
				message: "Usuario no encontrado",
			});
		}

		const pokedex = await prisma.collection.findMany({
			where: {
				userId: id,
			},
		});

		return res.json({
			pokedex,
		});
	} catch (error) {
		console.error(error);

		return res.status(400).json({
			message: "Ocurrio un error, intentalo de nuevo",
		});
	}
};

export default {
	userInfo,
	addPokemontoPokedex,
	myPokedex,
};
