import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient(); // 쿼리 확안을 원할시 -> new PrismaClient({ log: ["query"] })

if (process.env.NODE_ENV === "production") global.client = client;

export default client;
