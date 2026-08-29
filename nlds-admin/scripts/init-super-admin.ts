import { PrismaClient, AdminRole } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = process.env.INITIAL_SUPER_ADMIN_EMAIL;
    const password = process.env.INITIAL_SUPER_ADMIN_PASSWORD;

    if (!email || !password) {
        console.error('ERROR: Missing INITIAL_SUPER_ADMIN_EMAIL or INITIAL_SUPER_ADMIN_PASSWORD environment variables.');
        process.exit(1);
    }

    // Double check if this admin exists
    const existingAdmin = await prisma.admin.findUnique({
        where: { email: email.toLowerCase() }
    });

    if (existingAdmin) {
        console.log(`[INFO] Admin with email ${email} already exists. Skipping initialization.`);
        process.exit(0);
    }

    const passwordHash = await hash(password, 12);

    const admin = await prisma.admin.create({
        data: {
            email: email.toLowerCase(),
            passwordHash,
            role: AdminRole.SUPER_ADMIN,
            isActive: true,
        }
    });

    console.log(`[SUCCESS] Initial SUPER_ADMIN created successfully (ID: ${admin.id}).`);
    console.log(`[SECURITY WARNING] Please remember to remove the INITIAL_SUPER_ADMIN_PASSWORD variable from your .env.local file immediately after running this script!`);
}

main()
    .catch(e => {
        console.error('[FATAL] Failed to initialize Super Admin:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
