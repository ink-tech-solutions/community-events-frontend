import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the user information from cookies
    const user = request.cookies.get('user');
    console.log('user::', user);

    if (user) {
        // If the user is authenticated, allow the request to proceed
        return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    } else {
        return NextResponse.next();
        // If the user is not authenticated, redirect to login
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/login', // Adjust the protected path as needed
};
