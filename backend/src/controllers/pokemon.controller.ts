import { RequestHandler } from "express";
import config from "../config";
import {
	PokeApiListResponse,
	PokeApiPokemonResponse,
} from "../interfaces/pokedex";
import prisma from "../lib/prisma";

const getPokemonList: RequestHandler = async (req, res) => {
	try {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 25;

		const offset = (page - 1) * limit;

		const response = await fetch(
			`${config.POKEDEX_URL}/pokemon?limit=${limit}&offset=${offset}`
		);

		if (!response.ok) {
			return res.status(response.status).json({
				error: "Error al obtener el pokedex",
			});
		}

		const data = (await response.json()) as PokeApiListResponse;

		const pokedex = await Promise.all(
			data.results.map(async (pokemon) => {
				const pokemonResponse = await fetch(pokemon.url);

				if (!pokemonResponse.ok) {
					throw new Error(`Error al obtener ${pokemon.name}`);
				}

				const pokemonData = (await pokemonResponse.json()) as any;

				return {
					id: pokemonData.id,
					name: pokemonData.name,
					image: pokemonData.sprites.front_default,
				};
			})
		);

		res.status(200).json({
			data: pokedex,
			pagination: {
				page,
				limit,
				total: data.count,
				totalPages: Math.ceil(data.count / limit),
				hasNextPage: Boolean(data.next),
				hasPreviousPage: Boolean(data.previous),
			},
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: "Error al obtener el pokedex",
		});
	}
};
const getPokemonDetails: RequestHandler = async (req, res) => {
	try {
		const { id } = req.params;

		const userId = req.user?.id;
		const pokemonId = Number(id);
		let inCollection = false;

		if (userId) {
			const userCollection = await prisma.collection.findFirst({
				where: {
					userId,
					pokemonId,
				},
			});

			inCollection = !!userCollection;
		}

		const response = await fetch(`${config.POKEDEX_URL}/pokemon/${id}`);

		if (!response.ok) {
			return res.status(response.status).json({
				error: "Pokemon no encontrado",
			});
		}

		const data = (await response.json()) as PokeApiPokemonResponse;

		const pokemon = {
			id: data.id,
			name: data.name,
			image: data.sprites.other["official-artwork"].front_default,
			types: data.types.map((type: any) => type.type.name),

			height: data.height / 10,
			weight: data.weight / 10,

			abilities: data.abilities.map((ability: any) => ability.ability.name),

			baseExperience: data.base_experience,

			stats: data.stats.map((stat: any) => ({
				name: stat.stat.name,
				value: stat.base_stat,
			})),
			inCollection,
		};

		res.status(200).json(pokemon);
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: "Error al obtener los detalles del pokemon",
		});
	}
};

export default {
	getPokemonList,
	getPokemonDetails,
};
