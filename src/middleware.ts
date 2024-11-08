import { NextRequest, NextResponse } from 'next/server';
import {  getSession } from '../src/app/lib/statless-session';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/matches', '/lists', '/messages', '/members'];
const publicRoutes = ['authentication/login', 'authentication/signup', '/'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get('session')?.value;
  const session = await getSession();

  // Check for protected routes and missing session
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('authentication/login', req.nextUrl));
  }

  // Check for public routes and existing session (except for '/matches')
  if (isPublicRoute && session && path !== '/matches') {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}