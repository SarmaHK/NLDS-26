import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth/session';

export async function GET() {
    try {
        const admin = await getCurrentAdmin();

        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        return NextResponse.json({ admin });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
