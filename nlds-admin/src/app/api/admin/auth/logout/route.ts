import { NextResponse } from 'next/server';
import { destroySessionCookie } from '@/lib/auth/session';

export async function POST() {
    try {
        await destroySessionCookie();
        return NextResponse.json({ success: true, redirect: "/login" });
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
