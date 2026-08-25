// @ts-nocheck
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ENTITIES_MAP = {
    "CC": ["SKU", "KIU"],
    "CN": ["IIT"],
    "CS": ["Horizon", "SLTC", "KDU"],
    "Kandy": ["Jaffna", "Vauniya"],
    "SLIIT": ["CINEC"],
    "USJ": ["Sagies"],
    "NIBM": [],
    "NSBM": [],
    "Rajarata": [],
    "Ruhuna": [],
    "Wayamba": [],
    "Other": []
};

async function main() {
    console.log("Seeding Entities and Initiative Groups...");

    for (const [entityName, igs] of Object.entries(ENTITIES_MAP)) {
        const entity = await prisma.entity.upsert({
            where: { name: entityName },
            update: {},
            create: { name: entityName }
        });

        for (const igName of igs) {
            await prisma.initiativeGroup.upsert({
                where: { name_entityId: { name: igName, entityId: entity.id } },
                update: {},
                create: { name: igName, entityId: entity.id }
            });
        }
    }

    console.log("Seeding complete!");
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
