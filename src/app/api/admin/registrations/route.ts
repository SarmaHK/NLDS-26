// @ts-nocheck
import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/backend/security/admin-context";
import { prisma } from "@/lib/backend/db/prisma";
import { AuthorizationService } from "@/lib/backend/security/authorization.service";

export async function GET(request: Request) {
    try {
        const admin = await getAdminContext();
        if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // Ensure permission exists
        AuthorizationService.requirePermission(admin, "VIEW_REGISTRATION");

        const { searchParams } = new URL(request.url);
        const statusFilter = searchParams.get("status");

        const filter: any = {};
        if (statusFilter) filter.status = statusFilter;

        const registrations = await prisma.registration.findMany({
            where: filter,
            orderBy: { submittedAt: 'desc' },
            select: {
                id: true,
                referenceCode: true,
                status: true,
                submittedAt: true,
                currentPosition: true,
                participant: {
                    select: { fullName: true, aiesecEmail: true }
                },
                entity: {
                    select: { name: true }
                }
            }
        });

        return NextResponse.json({ success: true, data: registrations });
    } catch (error: any) {
        if (error.name === "AuthorizationError") {
            return NextResponse.json({ error: error.message }, { status: 403 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
