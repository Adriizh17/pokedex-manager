"use server";

import { config } from "@/config";
import { getSessionToken } from "@/lib/session";
import { PokemonDetails, PokemonResponse } from "@/types/pokemon";

const { API_ENDPOINT } = config;

export const getPokemon = async (page: number) => {
	try {
		const response = await fetch(
			`${API_ENDPOINT}/pokemon/list?page=${page}&limit=24`
		);

		const data: PokemonResponse = await response.json();

		return data.data;
	} catch {
		return null;
	}
};

export const getPokemonDetails = async (pokemonId: number) => {
	try {
		const token = await getSessionToken();

		if (!token) {
			return null;
		}

		const response = await fetch(
			`${API_ENDPOINT}/pokemon/details/${pokemonId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				cache: "no-store",
			}
		);

		if (!response.ok) {
			throw new Error("Error al obtener los detalles del Pokémon");
		}

		const data: PokemonDetails = await response.json();

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
