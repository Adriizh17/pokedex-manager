import HeaderSimple from "@/components/header-simple";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<HeaderSimple />
			{children}
		</>
	);
}
