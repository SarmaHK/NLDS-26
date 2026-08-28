import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = process.env.ADMIN_INITIAL_EMAIL;
    const password = process.env.ADMIN_INITIAL_PASSWORD;

    if (!email || !password) {
        console.error("❌ ADMIN_INITIAL_EMAIL or ADMIN_INITIAL_PASSWORD missing in the environment.");
        process.exit(1);
    }

    console.log(`[Seed] Checking existence of SUPER_ADMIN: ${email}...`);

    let admin = await prisma.admin.findUnique({
        where: { email }
    });

    if (admin) {
        console.log(`[Seed] ⚠️ Admin already exists. Ignored to preserve existing credentials/idempotency.`);
        return;
    }

    console.log(`[Seed] Hashing password and initializing secure environment...`);

    // Hash password strongly with bcrypt
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    admin = await prisma.admin.create({
        data: {
            email,
            passwordHash,
            role: "SUPER_ADMIN",
            isActive: true
        }
    });

    // Optionally grant explicit ALL permissions for Super Admin bypass later
    console.log(`[Seed] ✅ SUPER_ADMIN created successfully. ID: ${admin.id}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
