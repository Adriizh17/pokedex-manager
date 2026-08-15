"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";
import PokemonModal from "@/components/pokemon/pokemonModal";
import Markdown from "react-markdown";

interface AnalyzeImageResponse {
	found: boolean;
	id?: number;
	name?: string;
	text?: string;
}

export default function BuscarPage() {
	const [preview, setPreview] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(
		null
	);
	const [text, setText] = useState<string | null>(null);

	useEffect(() => {
		return () => {
			if (preview) {
				URL.revokeObjectURL(preview);
			}
		};
	}, [preview]);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selected = event.target.files?.[0];

		setError(null);

		if (!selected) {
			return;
		}

		if (preview) {
			URL.revokeObjectURL(preview);
		}

		setFile(selected);
		setPreview(URL.createObjectURL(selected));
	};

	const handleAnalyze = async () => {
		if (!file) {
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const formData = new FormData();
			formData.append("image", file);

			const response = await fetch("/api/pokemon/analyze-image", {
				method: "POST",
				body: formData,
			});

			const result: AnalyzeImageResponse = await response.json();

			if (response.ok && result.found && result.id) {
				setText(result.text ?? null);
				setSelectedPokemonId(result.id);
			} else {
				setText(null);
				setError(
					"No pudimos identificar ningún Pokémon en la imagen. Intenta con otra foto."
				);
			}
		} catch (err) {
			console.error(err);
			setError("Ocurrió un error. Intentalo de nuevo.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen bg-black px-6 py-10">
			<div className="mx-auto max-w-2xl">
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-white">📷 Buscar por foto</h1>
					<p className="mt-2 text-sm text-white/50">
						Sube una foto de un Pokémon y lo identificaremos por ti. Si aún no
						está en tu colección, podrás agregarlo.
					</p>
				</div>

				<label
					htmlFor="pokemon-photo"
					className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center transition hover:border-purple-500/40 hover:bg-white/[0.07]"
				>
					{preview ? (
						<Image
							src={preview}
							alt="Vista previa"
							width={200}
							height={200}
							unoptimized
							className="max-h-48 w-auto rounded-xl object-contain"
						/>
					) : (
						<>
							<span className="text-4xl">🖼️</span>
							<span className="text-sm text-white/60">
								Haz clic para seleccionar una imagen
							</span>
						</>
					)}
				</label>

				<input
					id="pokemon-photo"
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="hidden"
				/>

				<button
					type="button"
					disabled={!file || loading}
					onClick={handleAnalyze}
					className="mt-4 w-full rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-30"
				>
					{loading ? "Analizando..." : "✨ Analizar imagen"}
				</button>

				{error && (
					<p className="mt-4 text-center text-sm text-red-400">{error}</p>
				)}

				{text && (
					<div className="mt-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
						<h2 className="mb-3 text-lg font-semibold text-white">
							✨ Análisis de tu foto
						</h2>
						<div className="flex flex-wrap gap-2 text-white/80">
							<Markdown>{text}</Markdown>
						</div>
					</div>
				)}
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
