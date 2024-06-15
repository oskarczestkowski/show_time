// pages/api/login.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new NextResponse(
                JSON.stringify({ error: 'Email and password are required' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const result = await db.client.collection("users").authWithPassword(email, password);
        if (!result?.token) {
            return new NextResponse(
                JSON.stringify({ error: 'Invalid email or password' }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }
        
        return NextResponse.json({ token: result.token, user: result.record });
    } catch (err: any) {
        console.error('Error during login:', err);
        return new NextResponse(
            JSON.stringify({ error: err.message || 'Failed to process request' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
export const config = {
    api: {
        bodyParser: true, // Enable body parsing for JSON requests
    },
};