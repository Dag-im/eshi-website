import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard admin routes
  if (pathname.startsWith('/admin')) {
    const hasRefreshToken = request.cookies.has('refreshToken');

    if (!hasRefreshToken) {
      // redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // ✅ If cookie exists, let the backend verify it later
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
