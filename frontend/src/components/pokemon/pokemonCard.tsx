"use client";

import Image from "next/image";

interface PokemonCardProps {
	pokemon: {
		id: number;
		name: string;
		image: string | null;
	};
	onClick?: () => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="group relative flex w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#171626] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:bg-[#1c1b2d] hover:shadow-lg hover:shadow-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 sm:p-4"
		>

			<div className="flex h-20 w-20 items-center justify-center sm:h-28 sm:w-28 md:h-32 md:w-32">
				{pokemon.image ? (
					<Image
						src={pokemon.image}
						alt={pokemon.name}
						width={60}
						height={60}
						className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
					></Image>
				) : (
					<div className="text-sm text-white/30">Sin imagen</div>
				)}
			</div>

			<h3 className="mt-3 text-base font-semibold capitalize text-white">
				{pokemon.name}
			</h3>
		</button>
	);
}
