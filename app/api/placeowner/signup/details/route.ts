import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function POST(request: NextRequest) {
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

        const { user_id, name, company_name, imgUrl } = await request.json();

        // Validate the input
        if (!user_id || !company_name ) {
            return new NextResponse(
                JSON.stringify({ error: 'All fields are required' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Create artist details record
        const organizerDetails = await db.client.collection("organizers").create({
            user_id,
            company_name
        });

        // Update user's name in the users collection
        const userUpdate = await db.client.collection("users").update(user_id, {
            name: name,
            avatar: imgUrl
        });

        return NextResponse.json({ success: true, organizerDetails, userUpdate });
    } catch (err: any) {
        console.error('Error processing request:', err);
        return new NextResponse(
            JSON.stringify({ error: err.message || 'Failed to process request' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
