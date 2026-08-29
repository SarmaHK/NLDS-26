import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Vercel Serverless Hardening: Vercel injects natively into process.env, so it lacks a physical .env file on disk.
// We gracefully fallback to memory if the file does not exist, keeping your Windows path override intact locally.
try {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const secureEnvFile = dotenv.parse(fs.readFileSync(envPath));
    if (secureEnvFile.DATABASE_URL) {
      process.env.DATABASE_URL = secureEnvFile.DATABASE_URL;
    }
  }
} catch (e) {
  console.warn(
    "No physical .env file found; assuming native serverless injection (Vercel).",
  );
}

const globalForPrisma = global as unknown as { prismaEngineCore: PrismaClient };

export const prisma =
  globalForPrisma.prismaEngineCore ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: ["error", "info", "warn", "query"],
  });

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prismaEngineCore = prisma;
