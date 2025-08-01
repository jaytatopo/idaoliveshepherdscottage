
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('admin_auth');
  const { pathname } = request.nextUrl;

  // If trying to access any admin dashboard page without a cookie, redirect to login
  if (pathname.startsWith('/admin/dashboard') && !cookie) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If on the login page with a valid cookie, redirect to the dashboard
  if (pathname === '/admin' && cookie) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
};

