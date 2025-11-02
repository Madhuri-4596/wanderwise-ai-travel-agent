import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnLoginPage = req.nextUrl.pathname === '/login';
  const isOnSignupPage = req.nextUrl.pathname === '/signup';
  const isOnAuthPage = isOnLoginPage || isOnSignupPage;

  // If user is logged in and tries to access auth pages, redirect to home
  if (isLoggedIn && isOnAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If user is not logged in and tries to access protected pages, redirect to login
  if (!isLoggedIn && !isOnAuthPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|videos).*)'],
};
