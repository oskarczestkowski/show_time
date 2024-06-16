// pages/api/messages/receive.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function GET(request: NextRequest) {
    try {
        const user_id = request.headers.get('user_id'); // Extract user_id from headers

        if (!user_id) {
            console.error('User ID is required');
            return new NextResponse(
                JSON.stringify({ error: 'User ID is required' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        console.log('Fetching messages for user_id:', user_id);

        const messages = await db.client.collection("messages").getFullList({
            filter: `receiver_id='${user_id}'`, // Ensure the correct filter syntax
        });

        console.log('Fetched messages:', messages);

        return NextResponse.json(messages);
    } catch (err: any) {
        console.error('Error fetching messages:', err);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to fetch messages' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
