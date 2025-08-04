import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 1. Get all necessary details from the request
    const url = request.nextUrl.clone();
    const { pathname } = url;
    const hostname = request.headers.get('host');
    const authCookie = request.cookies.get('admin_auth');

    // 2. Define constants for easy configuration
    const adminHostname = 'admin.idaolivecottagemcgregor.co.za';
    const ADMIN_LOGIN_PATH = '/admin';
    const ADMIN_DASHBOARD_PATH = '/admin/dashboard';

    // 3. In development mode, we only care about the auth logic for simplicity.
    if (process.env.NODE_ENV === 'development') {
        // If trying to access dashboard without a cookie, redirect to login
        if (pathname.startsWith(ADMIN_DASHBOARD_PATH) && !authCookie) {
            return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
        }
        // If on the login page with a cookie, redirect to dashboard
        if (pathname === ADMIN_LOGIN_PATH && authCookie) {
            return NextResponse.redirect(new URL(ADMIN_DASHBOARD_PATH, request.url));
        }
        return NextResponse.next();
    }

    // --- PRODUCTION LOGIC ---

    // 4. Handle Subdomain Routing first
    // If an admin path is accessed on the main domain, redirect to the admin subdomain.
    if (hostname !== adminHostname && pathname.startsWith('/admin')) {
        url.hostname = adminHostname;
        return NextResponse.redirect(url);
    }
    // If a non-admin page is accessed on the admin domain, redirect to the main site.
    // We exclude the root path '/' because it has special handling below.
    if (hostname === adminHostname && !pathname.startsWith('/admin') && pathname !== '/') {
        const mainDomain = adminHostname.replace('admin.', '');
        url.hostname = mainDomain;
        return NextResponse.redirect(url);
    }
    
    // 5. Handle Authentication & Root Path on the Admin Domain
    if (hostname === adminHostname) {
        // Case A: User is at the root of the admin domain ('admin.domain.com/')
        if (pathname === '/') {
            return authCookie
                ? NextResponse.redirect(new URL(ADMIN_DASHBOARD_PATH, request.url)) // If logged in, go straight to dashboard
                : NextResponse.rewrite(new URL(ADMIN_LOGIN_PATH, request.url));      // If not, show the login page content
        }

        // Case B: User is explicitly on the login page ('/admin')
        if (pathname === ADMIN_LOGIN_PATH) {
            if (authCookie) {
                // If they have a cookie, don't let them see the login page again
                return NextResponse.redirect(new URL(ADMIN_DASHBOARD_PATH, request.url));
            }
        }
        
        // Case C: User is trying to access a protected dashboard page
        if (pathname.startsWith(ADMIN_DASHBOARD_PATH)) {
            if (!authCookie) {
                // If they don't have a cookie, send them to the login page
                return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
            }
        }
    }

    // If none of the above conditions are met, allow the request to proceed.
    return NextResponse.next();
}

// We use a more general matcher to ensure the middleware can check the
// hostname on ALL incoming requests, which is necessary for subdomain routing.
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
