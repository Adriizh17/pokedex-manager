import Image from "next/image";
import Link from "next/link";

export default function HeaderSimple() {
	return (
		<header className="flex justify-center w-full border-b border-red-800 bg-black text-white">
			<Link href="/">
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
