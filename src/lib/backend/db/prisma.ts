import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Explicitly bypass OS-level environment variable pollution (which caused Next.js to preserve a system-level 'DATABASE_URL' localhost string)
const secureEnvFile = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), '.env')));

// HARD OVERWRITE: Prisma's internal C++ Rust Query Engine spawns inheriting Node's `process.env`.
// If your Windows machine has a global System Env Var for DATABASE_URL, Prisma's engine natively prioritizes it over JS constructs!
process.env.DATABASE_URL = secureEnvFile.DATABASE_URL;

const globalForPrisma = global as unknown as { prismaEngineCore: PrismaClient };

export const prisma =
    globalForPrisma.prismaEngineCore ||
    new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL
            }
        },
        log: ["error", "info", "warn", "query"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaEngineCore = prisma;
