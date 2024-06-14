import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');
        let authToken = authHeader?.split(' ')[1]; // Extract token from 'Bearer <token>'
        
        if (authToken) {
            authToken = authToken.trim(); // Trim any extraneous spaces or line breaks
        }

        if (!authToken) {
            console.error('Authentication token is missing');
            return new NextResponse(
                JSON.stringify({ error: 'Authentication token is missing' }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        console.log("Received auth token:", authToken);

        const isAuthenticated = await db.isAuthenticated(authToken);
        console.log("Is authenticated:", isAuthenticated);
        if (!isAuthenticated) {
            console.error('Authentication token is invalid');
            return new NextResponse(
                JSON.stringify({ error: 'Authentication token is invalid' }),
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
        const artist = await db.client.collection("artists").getFirstListItem(`user_id="${userId}"`);

        console.log(userId)

        return NextResponse.json({ user, artist });
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
