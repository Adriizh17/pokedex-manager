import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import config from "../config";

const prismaClientSingleton = () => {
	const adapter = new PrismaMariaDb(config.DATABASE_URL);

	return new PrismaClient({ adapter });
};

declare global {
	var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
