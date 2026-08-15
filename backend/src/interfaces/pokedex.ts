export interface PokeApiListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: { name: string; url: string }[];
}

export interface PokeApiPokemonResponse {
	id: number;
	name: string;
	height: number;
	weight: number;
	base_experience: number;
	sprites: {
		front_default: string | null;
		other: {
			"official-artwork": {
				front_default: string | null;
			};
		};
	};
	types: {
		type: {
			name: string;
		};
	}[];
	abilities: {
		ability: {
			name: string;
		};
	}[];
	stats: {
		base_stat: number;
		stat: {
			name: string;
		};
	}[];
}