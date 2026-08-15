import { Request, Response } from "express";
import prisma from "../lib/prisma";
import config from "../config";

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

		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 25;

		const skip = (page - 1) * limit;

		const [pokedexColeccion, total] = await Promise.all([
			prisma.collection.findMany({
				where: {
					userId: id,
				},
				skip,
				take: limit,
				orderBy: {
					pokemonId: "asc",
				},
			}),
			prisma.collection.count({
				where: {
					userId: id,
				},
			}),
		]);

		const pokedex = await Promise.all(
			pokedexColeccion.map(async (pokemon) => {
				const pokemonResponse = await fetch(
					`${config.POKEDEX_URL}/pokemon/${pokemon.pokemonId}`
				);

				if (!pokemonResponse.ok) {
					throw new Error(`Error al obtener el Pokemon`);
				}

				const pokemonData = (await pokemonResponse.json()) as any;

				return {
					id: pokemonData.id,
					name: pokemonData.name,
					image: pokemonData.sprites.front_default,
				};
			})
		);

		return res.json({
			data: pokedex,
			pagination: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
				hasNextPage: page * limit < total,
				hasPreviousPage: page > 1,
			},
		});
	} catch (error) {
		console.error(error);

		return res.status(400).json({
			message: "Ocurrio un error, intentalo de nuevo",
		});
	}
};

const deletePokemontoPokedex = async (req: Request, res: Response) => {
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

		if (!existPokemon) {
			return res.status(400).json({
				message: "El Pokemon no se encuentra en la colección",
			});
		}

		const deletePokemon = await prisma.collection.delete({
			where: {
				id: existPokemon.id,
			},
		});

		return res.json({
			deleted: true,
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
	deletePokemontoPokedex,
};
