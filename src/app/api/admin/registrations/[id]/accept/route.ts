// @ts-nocheck
import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/backend/security/admin-context";
import { ReviewService } from "@/lib/backend/services/review.service";

const reviewService = new ReviewService();

export async function POST(request: Request, { params }: any) {
    try {
        const admin = await getAdminContext();
        if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { reason } = body;

        await reviewService.acceptRegistration(admin, params.id, reason);

        return NextResponse.json({ success: true, message: "Dossier accepted successfully" });
    } catch (error: any) {
        if (error.name === "AuthorizationError") return NextResponse.json({ error: error.message }, { status: 403 });
        return NextResponse.json({ error: error.message || "Internal Server Failure" }, { status: 400 });
    }
}
