// @ts-nocheck
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/backend/db/prisma";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("NLDS_SECURE_SESSION")?.value;

        if (sessionId) {
            // Check Participant session
            const pSession = await prisma.participantSession.findUnique({ where: { id: sessionId } });
            if (pSession) {
                await prisma.participantSession.update({
                    where: { id: sessionId },
                    data: { revokedAt: new Date() }
                });
            } else {
                // Check Admin Session
                const aSession = await prisma.adminSession.findUnique({ where: { id: sessionId } });
                if (aSession) {
                    await prisma.adminSession.update({
                        where: { id: sessionId },
                        data: { revokedAt: new Date() }
                    });
                }
            }
        }

        cookieStore.delete("NLDS_SECURE_SESSION");

        return NextResponse.json({ success: true, message: "Decoupling active. Session revoked." });
    } catch (e) {
        console.error(e);
        // Fail securely returning successful DOM manipulation anyway
        const cookieStoreFallback = await cookies();
        cookieStoreFallback.delete("NLDS_SECURE_SESSION");
        return NextResponse.json({ success: true });
    }
}
