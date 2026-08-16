"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PokemonDetails } from "@/types/pokemon";
import { getPokemonDescription, getPokemonDetails } from "@/actions/pokemon";
import { addToMyCollection, deleteToMyCollection } from "@/actions/user";
import Swal from "sweetalert2";
import Markdown from "react-markdown";

interface PokemonModalProps {
	pokemonId: number | null;
	onClose: () => void;
	onCollectionChange?: (pokemonId: number, inCollection: boolean) => void;
}

export default function PokemonModal({
	pokemonId,
	onClose,
	onCollectionChange,
}: PokemonModalProps) {
	const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [description, setDescription] = useState("");

	useEffect(() => {
		if (!pokemonId) {
			return;
		}

		const getPokemonDetail = async () => {
			try {
				const pokemonDetail = await getPokemonDetails(pokemonId);

				if (pokemonDetail) {
					setPokemon(pokemonDetail);

					if (!pokemonDetail.inCollection) {
						setLoading(false);
						const description = await getPokemonDescription(pokemonDetail.name);
						setDescription(description || "");
					}
				} else throw error;
			} catch (error) {
				console.log(error);
				setError("No se pudieron obtener los detalles del Pokémon");
			} finally {
				setLoading(false);
			}
		};

		getPokemonDetail();
	}, [pokemonId]);

	if (!pokemonId) {
		return null;
	}

	const addPokemon = async () => {
		if (!pokemon?.inCollection) {
			try {
				const pokemonAdd = await addToMyCollection(pokemonId);

				if (pokemonAdd && pokemon) {
					setPokemon({ ...pokemon, inCollection: true });
					onCollectionChange?.(pokemonId, true);
					Swal.fire({
						icon: "success",
						title: "El Pokémon se agrego correctamente a la colección",
						showConfirmButton: false,
						timer: 1500,
					});
				} else throw error;
			} catch (error) {
				console.log(error);
				Swal.fire({
					icon: "error",
					title: "Ocurrio un error. Intentalo de nuevo",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} else return null;
	};

	const removePokemon = async () => {
		if (!pokemon?.inCollection) {
			return null;
		}

		try {
			const pokemonRemove = await deleteToMyCollection(pokemonId);

			if (pokemonRemove) {
				setPokemon({ ...pokemon, inCollection: false });
				onCollectionChange?.(pokemonId, false);
				Swal.fire({
					icon: "success",
					title: "El Pokémon se elimino correctamente de la colección",
					showConfirmButton: false,
					timer: 1500,
				});
			} else throw error;
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "Ocurrio un error. Intentalo de nuevo",
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="relative flex w-full max-w-2xl max-h-[90vh] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#171626] shadow-2xl"
				onClick={(event) => event.stopPropagation()}
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-xl text-white/70 transition hover:bg-white/10 hover:text-white sm:right-5 sm:top-5 sm:h-9 sm:w-9"
				>
					×
				</button>

				{loading && (
					<div className="flex min-h-[300px] items-center justify-center py-16">
						<div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-purple-500" />
					</div>
				)}

				{error && !loading && (
					<div className="flex min-h-[300px] items-center justify-center px-6 text-center text-red-400">
						{error}
					</div>
				)}

				{pokemon && !loading && !error && (
					<div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:p-8">
						<div className="flex flex-col items-center gap-4 sm:flex-row">
							<div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-2xl bg-white/5 sm:h-48 sm:w-48">
								{pokemon.image && (
									<Image
										src={pokemon.image}
										alt={pokemon.name}
										width={180}
										height={180}
										className="h-full w-full object-contain"
									/>
								)}
							</div>

							<div className="w-full text-center sm:text-left">
								<p className="text-sm font-medium text-purple-400">
									#{String(pokemon.id).padStart(3, "0")}
								</p>

								<h2 className="mt-0 text-3xl font-bold capitalize text-white sm:text-4xl">
									{pokemon.name}
								</h2>

								<div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
									{pokemon.types.map((type) => (
										<span
											key={type}
											className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-medium capitalize text-purple-300"
										>
											{type}
										</span>
									))}
								</div>

								<div className="mt-2 grid grid-cols-2 gap-4">
									<div className="rounded-xl bg-white/5 p-2">
										<p className="text-xs uppercase tracking-wider text-white/40">
											Altura
										</p>
										<p className="mt-1 text-base font-semibold text-white">
											{pokemon.height} m
										</p>
									</div>

									<div className="rounded-xl bg-white/5 p-2">
										<p className="text-xs uppercase tracking-wider text-white/40">
											Peso
										</p>
										<p className="mt-1 text-base font-semibold text-white">
											{pokemon.weight} kg
										</p>
									</div>
								</div>
								<div className="mt-2">
									<button
										type="button"
										className={`w-full rounded-xl px-5 py-1 font-semibold transition text-sm ${
											pokemon.inCollection
												? "bg-white/10 text-white hover:bg-white/15 cursor-not-allowed"
												: "bg-purple-600 text-white hover:bg-purple-500 cursor-pointer"
										}`}
										onClick={addPokemon}
									>
										{pokemon.inCollection
											? "✓ En mi colección"
											: "+ Agregar a mi colección"}
									</button>

									{pokemon.inCollection && (
										<button
											type="button"
											onClick={removePokemon}
											className="mt-2 w-full text-center text-xs text-white/30 transition hover:text-red-400 cursor-pointer"
										>
											Eliminar de mi colección
										</button>
									)}
								</div>
							</div>
						</div>

						{!pokemon.inCollection && (
							<div className="mt-6">
								<h3 className="mb-3 text-lg font-semibold text-white">
									✨ Descripción
								</h3>

								{description != "" ? (
									<div className="flex flex-wrap gap-2">
										<Markdown>{description}</Markdown>{" "}
									</div>
								) : (
									<div className="flex min-h-[50px] items-center justify-center py-6">
										<div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-purple-500" />
									</div>
								)}
							</div>
						)}

						<div className="mt-6">
							<h3 className="mb-4 text-lg font-semibold text-white">
								Estadísticas
							</h3>

							<div className="space-y-3">
								{pokemon.stats.map((stat) => (
									<div key={stat.name}>
										<div className="mb-1 flex justify-between text-xs">
											<span className="capitalize text-white/60">
												{stat.name.replace("-", " ")}
											</span>

											<span className="font-medium text-white">
												{stat.value}
											</span>
										</div>

										<div className="h-2 overflow-hidden rounded-full bg-white/10">
											<div
												className="h-full rounded-full bg-purple-500"
												style={{
													width: `${Math.min(100, (stat.value / 150) * 100)}%`,
												}}
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="mt-6">
							<h3 className="mb-3 text-lg font-semibold text-white">
								Habilidades
							</h3>

							<div className="flex flex-wrap gap-2">
								{pokemon.abilities.map((ability) => (
									<span
										key={ability}
										className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm capitalize text-white/70"
									>
										{ability.replace("-", " ")}
									</span>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
