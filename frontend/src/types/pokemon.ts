export interface Pokemon {
	id: number;
	name: string;
	image: string | null;
}

export interface PokemonResponse {
	data: Pokemon[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
	};
}

export interface PokemonDetails {
	id: number;
	name: string;
	image: string | null;
	types: string[];
	height: number;
	weight: number;
	abilities: string[];
	baseExperience: number;
	stats: {
		name: string;
		value: number;
	}[];
	inCollection: boolean;
}
