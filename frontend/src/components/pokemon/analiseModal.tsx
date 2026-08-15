"use client";

import { useEffect, useState } from "react";
import { getAnalise } from "@/actions/user";
import Markdown from "react-markdown";

interface AnaliseModalProps {
	onClose: () => void;
}

export default function AnaliseModal({ onClose }: AnaliseModalProps) {
	const [analise, setAnalise] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAnalise = async () => {
			try {
				const result = await getAnalise();

				if (result) {
					setAnalise(result);
				} else throw error;
			} catch (error) {
				console.log(error);
				setError("No se pudo obtener el análisis de tu colección");
			} finally {
				setLoading(false);
			}
		};

		fetchAnalise();
	}, []);

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

				<div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:p-8">
					<h2 className="mb-4 text-2xl font-bold text-white">
						✨ Análisis de tu colección
					</h2>

					{loading && (
						<div className="flex min-h-[200px] items-center justify-center py-16">
							<div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-purple-500" />
						</div>
					)}

					{error && !loading && (
						<div className="flex min-h-[200px] items-center justify-center px-6 text-center text-red-400">
							{error}
						</div>
					)}

					{analise && !loading && !error && (
						<div className="flex flex-wrap gap-2 text-white/80">
							<Markdown>{analise}</Markdown>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
