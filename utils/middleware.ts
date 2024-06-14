import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function middleware(request: NextRequest) {
    console.log(`[middleware] ${request.method} ${request.url}`);

    const authHeader = request.headers.get('Authorization');
    const authToken = authHeader?.split(' ')[1]; // Extract token from 'Bearer <token>'

    if (!authToken) {
        console.log('No auth token found, redirecting to sign-up');
        return NextResponse.redirect(new URL('/sign-up', request.url));
    }

    const isAuthenticated = await db.isAuthenticated(authToken);
    console.log("Is authenticated:", isAuthenticated);

    if (!isAuthenticated) {
        console.log('Invalid auth token, redirecting to sign-up');
        return NextResponse.redirect(new URL('/sign-up', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*', // Match all subpages in /dashboard
    ],
};
