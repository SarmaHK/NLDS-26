
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function clean() {
    const tablenames = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    for (const { tablename } of tablenames) {
        if (tablename !== "_prisma_migrations") {
            try {
                await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tablename}" CASCADE;`);
            } catch (error) {
                console.log({ error });
            }
        }
    }
    console.log("Database records wiped completely!");
}
clean().catch(console.error).finally(()=>prisma.$disconnect());

