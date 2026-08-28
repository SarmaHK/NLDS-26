// @ts-nocheck
import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/backend/security/admin-context";
import { prisma } from "@/lib/backend/db/prisma";
import { AuthorizationService } from "@/lib/backend/security/authorization.service";

export async function GET(request: Request) {
    try {
        const admin = await getAdminContext();
        if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        AuthorizationService.requirePermission(admin, "VIEW_AUDIT_LOGS");

        const logs = await prisma.auditLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100 // Cap pagination avoiding heavy scans mapping.
        });

        return NextResponse.json({ success: true, data: logs });
    } catch (error: any) {
        if (error.name === "AuthorizationError") {
            return NextResponse.json({ error: "Action Denied or Database Connection Failed" }, { status: 403 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
