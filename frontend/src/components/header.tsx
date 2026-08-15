"use client";

import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
	onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
	return (
		<header className="flex w-full items-center gap-3 border-b border-red-800 bg-black px-2 py-1 text-white">
			<button
				type="button"
				onClick={onMenuClick}
				aria-label="Abrir menú"
				className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-lg transition hover:bg-white/10"
			>
				<span className="h-0.5 w-5 rounded-full bg-white" />
				<span className="h-0.5 w-5 rounded-full bg-white" />
				<span className="h-0.5 w-5 rounded-full bg-white" />
			</button>

			<Link href="/dashboard">
				<Image
					alt="PokeDex"
					src={"/images/PokeDex.jpg"}
					width={150}
					height={50}
				></Image>
			</Link>
		</header>
	);
}
