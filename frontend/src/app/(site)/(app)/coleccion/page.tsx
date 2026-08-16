"use client";

import { getMyCollection } from "@/actions/user";
import AnaliseModal from "@/components/pokemon/analiseModal";
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
	const [showAnalise, setShowAnalise] = useState(false);

	useEffect(() => {
		const getPokemonPage = async () => {
			const pokemon = await getMyCollection(page);
			if (pokemon) {
				setPokemon(pokemon);
			}
		};

		getPokemonPage();
	}, [page]);

	return (
		<main className="min-h-screen bg-black px-6 py-10">
			<div className="mx-auto max-w-7xl">
				<div className="py-4">
					<h1 className="text-2xl font-bold text-white">Mi PokéDex</h1>
				</div>
				<div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-sm text-white/50">
						Explora tu colección, puedes eliminar los que ya no quieras.
					</p>
					<div>
						<button
							type="button"
							onClick={() => setShowAnalise(true)}
							className="w-full rounded-lg border border-purple-500/40 bg-purple-500/15 px-4 py-2 text-sm font-medium text-purple-300 transition hover:bg-purple-500/25 sm:w-auto"
						>
							✨ Analizar mi colección
						</button>
					</div>
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
					onCollectionChange={(pokemonId, inCollection) => {
						if (!inCollection) {
							setPokemon((current) =>
								current.filter((item) => item.id !== pokemonId)
							);
						}
					}}
				/>
			)}

			{showAnalise && <AnaliseModal onClose={() => setShowAnalise(false)} />}
		</main>
	);
}
