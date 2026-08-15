import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { logout } from "@/actions/auth";
import { getCurrentUser } from "@/lib/session";

export default async function Home() {
	const user = await getCurrentUser();

	return (
		<>
			<Suspense>
				<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
					<main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center bg-white dark:bg-black">
						<div className="flex flex-col justify-center items-center">
							<div className="w-full">
								<Image
									alt="PokeDex"
									src={"/images/PokeDex.jpg"}
									width={670}
									height={360}
								></Image>
							</div>
							<div className="w-full">
								{user ? (
									<div className="flex flex-col items-center gap-2">
										<p className="text-center dark:text-white">
											Hola, {user.username}
										</p>
										<form action={logout}>
											<button className="mt-2 cursor-pointer bg-zinc-800 font-semibold rounded-full px-8 py-2 text-white hover:bg-zinc-700 transition-colors">
												Cerrar sesión
											</button>
										</form>
									</div>
								) : (
									<div className="flex items-center justify-center gap-2">
										<Link href="/login" prefetch={false}>
											<button className="mt-4 cursor-pointer bg-blue-900  font-semibold rounded-full px-8 py-2 text-blue hover:bg-blue-800 transition-colors">
												Iniciar sesión
											</button>
										</Link>
										<Link href="/registro" prefetch={false}>
											<button className="mt-4 cursor-pointer bg-red-900 font-semibold rounded-full px-8 py-2 text-blue hover:bg-red-800 transition-colors">
												Registrate
											</button>
										</Link>
									</div>
								)}
							</div>
						</div>
					</main>
				</div>
			</Suspense>
		</>
	);
}
