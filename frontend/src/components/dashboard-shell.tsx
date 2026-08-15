"use client";

import { ReactNode, useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function DashboardShell({ children }: { children: ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="flex min-h-full flex-1 flex-col">
			<Header onMenuClick={() => setIsSidebarOpen((current) => !current)} />

			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

			{children}
		</div>
	);
}
