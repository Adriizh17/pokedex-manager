import { RequestHandler } from "express";
import config from "../config";
import { PokeApiListResponse } from "../interfaces/pokedex";

const getPokemonList: RequestHandler = async (req, res) => {
	try {
		const response = await fetch(
			`${config.POKEDEX_URL}/pokemon?limit=10&offset=0`
		);
		const data = (await response.json()) as PokeApiListResponse;
		console.log(data);
		const pokedex = data.results;
		res.status(200).json(pokedex);
	} catch (error) {
		res.status(400).json({ error: "Error al obtener el pokedex" });
	}
};

const getPokemonDetails: RequestHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await fetch(`${config.POKEDEX_URL}/pokemon/${id}`);
		const data = (await response.json()) as any;
		console.log(data);
		res.status(200).json(data);
	} catch (error) {
		res
			.status(400)
			.json({ error: "Error al obtener los detalles del pokemon" });
	}
};

export default {
	getPokemonList,
	getPokemonDetails,
};
