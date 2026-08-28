import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Define the precise array bounded by Phase 1 UI architectures
const protectedRoutes = [
    '/dashboard',
    '/registrations',
    '/participants',
    '/cvs',
    '/photos',
    '/analytics',
    '/access',
    '/audit',
    '/settings'
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

    // Secret verification bound
    const SECRET_KEY = new TextEncoder().encode(
        process.env.SESSION_SECRET || 'fallback_development_secret_only_for_local_env'
    );
    const token = request.cookies.get('nlds_admin_session')?.value;

    if (isProtected) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            // Very high speed Edge-compliant JWT verification mechanically routing requests correctly
            await jwtVerify(token, SECRET_KEY);
            return NextResponse.next();
        } catch (e) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Bypass /login if already authenticated
    if (pathname === '/login' || pathname === '/') {
        if (token) {
            try {
                await jwtVerify(token, SECRET_KEY);
                return NextResponse.redirect(new URL('/dashboard', request.url));
            } catch (e) {
                // Ignore gracefully allowing login attempt
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
