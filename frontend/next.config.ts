import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
			},
		],
	},
	reactStrictMode: false,
	experimental: {
		serverActions: {
			bodySizeLimit: "8mb",
		},
	},
};

export default nextConfig;
