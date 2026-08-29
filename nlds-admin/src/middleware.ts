import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public Paths that don't need auth checking
    if (
        pathname.startsWith('/api/auth') ||
        pathname.startsWith('/api/admin/auth') ||
        pathname.startsWith('/_next') ||
        pathname.includes('favicon')
    ) {
        return NextResponse.next();
    }

    // Check if session cookie exists (lightweight check, server validates fully on API/Server Load)
    const sessionToken = request.cookies.get('nlds_admin_session')?.value;

    const isLoginPage = pathname === '/login';

    if (!sessionToken && !isLoginPage) {
        // Unauthenticated user trying to access secure route -> redirect to login
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (sessionToken && isLoginPage) {
        // Authenticated user trying to access login -> redirect to dashboard
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    if (pathname === '/') {
        // Root redirects directly to dashboard assuming they have a session
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
