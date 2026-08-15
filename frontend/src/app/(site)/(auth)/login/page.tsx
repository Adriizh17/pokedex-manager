"use client";
import { login } from "@/actions/auth";
import AuthInput from "@/components/auth-input";
import Link from "next/link";
import { useActionState } from "react";

const initialState = {
	success: false,
	message: "",
};

export default function LoginPage() {
	const [state, formAction, pending] = useActionState(login, initialState);

	return (
		<main className="flex min-h-screen items-center justify-center bg-black px-4">
			<div className="w-full max-w-md">
				<div className="w-full max-w-md overflow-hidden rounded-2xl shadow-sm ring-1 ring-red-200">
					<div className="bg-blue-900 p-8 text-center">
						<h1 className="text-3xl font-bold text-white">PokéDex Manager</h1>
					</div>
					<div className="bg-black p-1"></div>

					<div className="bg-white p-8">
						<form className="space-y-5" action={formAction}>
							<AuthInput
								label="Email"
								name="email"
								type="email"
								placeholder="tu@email.com"
							/>

							<AuthInput
								label="Contraseña"
								name="password"
								type="password"
								placeholder="••••••••"
							/>

							<button
								type="submit"
								disabled={pending}
								className={`w-full rounded-lg bg-blue-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
									pending
										? "cursor-not-allowed opacity-50"
										: "cursor-pointer hover:bg-blue-700"
								}`}
							>
								{pending ? "Iniciando sesión..." : "Iniciar sesión"}
							</button>

							{state.message && (
								<p
									className={state.success ? "text-green-600" : "text-red-600"}
								>
									{state.message}
								</p>
							)}
						</form>

						<p className="mt-6 text-center text-sm text-gray-700">
							¿No tienes una cuenta?{" "}
							<Link
								href="/registro"
								className="font-medium text-amber-500 hover:text-amber-700"
							>
								Crear cuenta
							</Link>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
