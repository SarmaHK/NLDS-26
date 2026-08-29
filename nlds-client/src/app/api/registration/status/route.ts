import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/backend/db/prisma";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("NLDS_SECURE_SESSION")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Unauthorized. Missing authentication token." },
        { status: 401 },
      );
    }

    const activeSession = await prisma.participantSession.findFirst({
      where: {
        id: sessionId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { participant: true }, // Includes participantId mechanically
    });

    if (!activeSession) {
      return NextResponse.json(
        { error: "Session expired or invalid." },
        { status: 403 },
      );
    }

    const registration = await prisma.registration.findFirst({
      where: { participantId: activeSession.participantId },
      orderBy: { createdAt: "desc" },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "No active mission file found." },
        { status: 404 },
      );
    }

    // Extremely restrictive return bypassing internal DB/Admin payloads mapped securely
    return NextResponse.json(
      {
        success: true,
        statusData: {
          registrationId: registration.id,
          referenceCode: registration.referenceCode,
          status: registration.status,
          submittedAt: registration.submittedAt,
          updatedAt: registration.updatedAt,
        },
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("[GET Status Error]", err);
    return NextResponse.json(
      { error: "Internal abstraction pipeline failure." },
      { status: 500 },
    );
  }
}
