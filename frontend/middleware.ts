import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminLoginRoute = pathname === '/admin/login';

  // Only guard admin routes
  if (pathname.startsWith('/admin') && !isAdminLoginRoute) {
    const hasRefreshToken = request.cookies.has('refreshToken');

    if (!hasRefreshToken) {
      // redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    // ✅ If cookie exists, let the backend verify it later
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
