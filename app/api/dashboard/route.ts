// pages/api/dashboard.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');
        const authToken = authHeader?.split(' ')[1];

        if (!authToken) {
            return new Response(
                JSON.stringify({ error: 'Authentication required' }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        db.client.authStore.save(authToken, null);

        if (!db.client.authStore.isValid) {
            return new Response(
                JSON.stringify({ error: 'Invalid auth token' }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const userId = db.client.authStore.model?.id;
        if (!userId) {
            return new Response(
                JSON.stringify({ error: 'User not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const user = await db.client.collection("users").getOne(userId);

        return NextResponse.json({ user });
    } catch (err: any) {
        console.error('Error processing request:', err);
        return new Response(
            JSON.stringify({ error: err.message || 'Failed to process request' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
