"use client";

import { getPokemon } from "@/actions/pokemon";
import PokemonGrid from "@/components/pokemon/pokemonGrid";
import PokemonModal from "@/components/pokemon/pokemonModal";
import { Pokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";

export default function DashboardPage() {
	const [pokemon, setPokemon] = useState<Pokemon[]>([]);
	const [page, setPage] = useState(1);
	const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(
		null
	);

	useEffect(() => {
		const getPokemonPage = async () => {
			const pokemon = await getPokemon(page);
			if (pokemon) {
				setPokemon(pokemon);
			}
		};

		getPokemonPage();
	}, [page]);

	return (
		<main className="min-h-screen bg-black px-6 py-10">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8">
					<p className="mt-2 text-sm text-white/50">
						Explora todos los Pokémon y añadelos a tu colección.
					</p>
				</div>

				<PokemonGrid
					pokemon={pokemon}
					onPokemonClick={(pokemon) => {
						setSelectedPokemonId(pokemon.id);
					}}
				/>

				<div className="mt-10 flex items-center justify-center gap-4">
					<button
						type="button"
						disabled={page === 1}
						onClick={() => setPage((current) => current - 1)}
						className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
					>
						Anterior
					</button>

					<span className="text-sm text-white/50">Página {page}</span>

					<button
						type="button"
						onClick={() => setPage((current) => current + 1)}
						className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/5"
					>
						Siguiente
					</button>
				</div>
			</div>
			{selectedPokemonId && (
				<PokemonModal
					key={selectedPokemonId}
					pokemonId={selectedPokemonId}
					onClose={() => setSelectedPokemonId(null)}
				/>
			)}
		</main>
	);
}
