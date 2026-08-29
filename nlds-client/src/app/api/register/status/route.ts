// @ts-nocheck
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/backend/db/prisma";
import { RegistrationService } from "@/lib/backend/services/registration.service";
import { RegistrationRepository } from "@/lib/backend/repositories/registration.repository";

const repo = new RegistrationRepository();
const service = new RegistrationService(repo);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get("id");

    if (!ref) {
      return NextResponse.json(
        { error: "Mission ID required." },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const sessionId = cookieStore.get("NLDS_SECURE_SESSION")?.value;
    if (!sessionId)
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 },
      );

    const activeSession = await prisma.participantSession.findFirst({
      where: { id: sessionId, revokedAt: null, expiresAt: { gt: new Date() } },
    });

    if (!activeSession)
      return NextResponse.json({ error: "Session expired." }, { status: 401 });

    const statusReport = await prisma.registration.findUnique({
      where: { referenceCode: ref },
      select: {
        referenceCode: true,
        status: true,
        submittedAt: true,
        participantId: true,
      },
    });

    if (
      !statusReport ||
      statusReport.participantId !== activeSession.participantId
    ) {
      return NextResponse.json(
        { error: "Dossier not found or unauthorized access." },
        { status: 404 },
      );
    }

    // Extract exclusively public states avoiding all backend rationales
    return NextResponse.json({
      success: true,
      data: {
        referenceCode: statusReport.referenceCode,
        status: statusReport.status,
        submittedAt: statusReport.submittedAt,
      },
    });
  } catch (error: any) {
    console.error("[Get Registration Status]", error);
    return NextResponse.json(
      { error: "Internal Server System Failure." },
      { status: 500 },
    );
  }
}
