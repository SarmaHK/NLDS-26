// @ts-nocheck
import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/backend/security/admin-context";
import { prisma } from "@/lib/backend/db/prisma";
import { AuthorizationService } from "@/lib/backend/security/authorization.service";

export async function GET(request: Request, { params }: any) {
  try {
    const admin = await getAdminContext();
    if (!admin)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    AuthorizationService.requirePermission(admin, "VIEW_REGISTRATION");

    let registration = await prisma.registration.findUnique({
      where: { id: params.id },
      include: {
        participant: true,
        entity: true,
        initiativeGroup: true,
        documents: true,
        reviews: {
          include: { reviewer: { select: { email: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!registration)
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 },
      );

    // Strip sensitive fields explicitly using permission boundaries matching requirements precisely
    try {
      AuthorizationService.requirePermission(admin, "VIEW_SENSITIVE_PROFILE");
    } catch {
      registration = {
        ...registration,
        medicalConditions: "Restricted information",
      };
    }

    try {
      AuthorizationService.requirePermission(admin, "DOCUMENT_VIEW");
    } catch {
      // Strip Document URL references securely
      registration.documents = registration.documents.map((d: any) => ({
        id: d.id,
        type: d.type,
        urlReference: "Restricted information", // Blindly mask URL natively
      }));
    }

    return NextResponse.json({ success: true, data: registration });
  } catch (error: any) {
    if (error.name === "AuthorizationError") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
