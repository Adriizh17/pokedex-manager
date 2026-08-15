"use server";

import { config } from "@/config";
import { getSessionToken } from "@/lib/session";
import { PokemonResponse } from "@/types/pokemon";

const { API_ENDPOINT } = config;

export const addToMyCollection = async (pokemonId: number) => {
	try {
		const token = await getSessionToken();

		if (!token) {
			return null;
		}

		const response = await fetch(`${API_ENDPOINT}/pokemon/add`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				pokemonId,
			}),
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error("Error al guardar el Pokémon en la colección");
		}

		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getMyCollection = async (page: number) => {
	try {
		const token = await getSessionToken();

		if (!token) {
			return null;
		}

		const response = await fetch(
			`${API_ENDPOINT}/pokemon/my-colection?page=${page}&limit=24`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				cache: "no-store",
			}
		);

		if (!response.ok) {
			throw new Error("Error al obtener la colección");
		}

		const data: PokemonResponse = await response.json();

		return data.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const deleteToMyCollection = async (pokemonId: number) => {
	try {
		const token = await getSessionToken();

		if (!token) {
			return null;
		}

		const response = await fetch(`${API_ENDPOINT}/pokemon/delete`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				pokemonId,
			}),
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error("Error al eliminar el Pokémon de la colección");
		}

		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
};
