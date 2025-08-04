import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone(); // Use a clone to modify
  const hostname = request.headers.get('host');

  const isAdminPath = url.pathname.startsWith('/admin');
  const adminHostname = 'admin.idaolivecottagemcgregor.co.za';

  // In development, we likely use localhost, so we can skip the host checks.
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // Case 1: An admin path is being accessed, but not on the admin subdomain.
  // Action: Redirect to the correct admin subdomain.
  if (isAdminPath && hostname !== adminHostname) {
    url.hostname = adminHostname;
    return NextResponse.redirect(url);
  }

  // Case 2: A non-admin path is being accessed on the admin subdomain.
  // Action: Redirect to the main domain.
  if (!isAdminPath && hostname === adminHostname) {
    const mainDomain = adminHostname.replace('admin.', '');
    url.hostname = mainDomain;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except for static files and API routes.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
