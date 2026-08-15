"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

const links = [
	{ href: "/dashboard", label: "Todos los Pokémon" },
	{ href: "/coleccion", label: "Mi colección" },
	{ href: "/buscar", label: "Busca un Pokémon" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
	const pathname = usePathname();

	return (
		<>
			{isOpen && (
				<div
					aria-hidden
					onClick={onClose}
					className="fixed inset-0 z-40 bg-black/60"
				/>
			)}

			<aside
				className={`
					fixed inset-y-0 left-0 z-50
					flex w-64 flex-col
					border-r border-white/10 bg-[#12111d]
					transition-transform duration-300
					${isOpen ? "translate-x-0" : "-translate-x-full"}
				`}
			>
				<div className="flex items-center justify-between px-4 py-4">
					<span className="text-sm font-semibold text-white/70">Menú</span>
					<button
						type="button"
						onClick={onClose}
						aria-label="Cerrar menú"
						className="rounded-lg p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
					>
						✕
					</button>
				</div>

				<nav className="flex flex-1 flex-col gap-1 px-3 py-2">
					{links.map((link) => {
						const isActive = pathname === link.href;

						return (
							<Link
								key={link.href}
								href={link.href}
								onClick={onClose}
								className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
									isActive
										? "bg-purple-500/10 text-purple-300"
										: "text-white/70 hover:bg-white/5 hover:text-white"
								}`}
							>
								{link.label}
							</Link>
						);
					})}
				</nav>

				<div className="border-t border-white/10 px-3 py-2">
					<form action={logout}>
						<button
							type="submit"
							className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
						>
							Cerrar sesión
						</button>
					</form>
				</div>
			</aside>
		</>
	);
}
