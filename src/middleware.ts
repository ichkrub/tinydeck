import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Create a response to modify
  const res = NextResponse.next();
  
  // Create a Supabase client using the middleware helper
  const supabase = createMiddlewareClient({ req: request, res });
  
  try {
    // Refresh the session and get latest data
    const { data: { session } } = await supabase.auth.getSession();

    // Only check authentication for protected routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      if (!session) {
        // Store the original URL to redirect to after login
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
      }
    }

    // Return the response with the session refreshed
    return res;
  } catch (e) {
    // If there's an error, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
