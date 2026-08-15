"use client";

import PokemonCard from "./pokemonCard";

interface Pokemon {
	id: number;
	name: string;
	image: string | null;
}

interface PokemonGridProps {
	pokemon: Pokemon[];
	onPokemonClick?: (pokemon: Pokemon) => void;
}

export default function PokemonGrid({
	pokemon,
	onPokemonClick,
}: PokemonGridProps) {
	return (
		<div
			className="
      grid
      grid-cols-2
      gap-4
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-5
      xl:grid-cols-6
    "
		>
			{pokemon.map((item) => (
				<PokemonCard
					key={item.id}
					pokemon={item}
					onClick={() => onPokemonClick?.(item)}
				/>
			))}
		</div>
	);
}
