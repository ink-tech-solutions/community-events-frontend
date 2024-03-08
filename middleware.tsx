import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const user = request.cookies.get('user');

    if (user) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: '/login',
};
