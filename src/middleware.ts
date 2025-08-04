import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host');

  const adminHostname = 'admin.idaolivecottagemcgregor.co.za';
  const ADMIN_LOGIN_PATH = '/admin'; // This now correctly points to your login page

  // In development, we can skip host checks.
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // --- Handle traffic on the ADMIN subdomain ---
  if (hostname === adminHostname) {
    // If user is at the root, show them the login page content
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL(ADMIN_LOGIN_PATH, request.url));
    }
    // If they try to visit any OTHER non-admin page (like /about) on the admin domain,
    // send them to the main site. This correctly handles the "Back to Site" link.
    if (!url.pathname.startsWith('/admin')) {
        const mainDomain = adminHostname.replace('admin.', '');
        return NextResponse.redirect(new URL(url.pathname, `https://${mainDomain}`));
    }
  } 
  // --- Handle traffic on the MAIN subdomain ---
  else {
    // If an admin path is being accessed on the main domain, redirect to admin domain
    if (url.pathname.startsWith('/admin')) {
      url.hostname = adminHostname;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except for static files and API routes.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
