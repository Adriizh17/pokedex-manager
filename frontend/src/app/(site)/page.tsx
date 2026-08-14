import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
	return (
		<>
			<Suspense>
				<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
					<main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
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
								<div className="flex items-center justify-center gap-2">
									<button>Iniciar sesión</button>
									<button>Regístrate</button>
								</div>
							</div>
						</div>
					</main>
				</div>
			</Suspense>
		</>
	);
}
