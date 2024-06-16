// /app/api/messages/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function POST(request: NextRequest) {
    try {
        const { sender_id, receiver_id, message } = await request.json();

        console.log('Received request to send message:', { sender_id, receiver_id, message });

        if (!sender_id || !receiver_id || !message) {
            console.error('Missing required fields:', { sender_id, receiver_id, message });
            return new NextResponse(
                JSON.stringify({ error: 'Sender ID, receiver ID, and message are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Fetch the user_id using the organizer_id (receiver_id)
        const organizerRecord = await db.client.collection("organizers").getFirstListItem(`id="${receiver_id}"`);
        const user_id = organizerRecord.user_id;

        if (!user_id) {
            console.error('User ID not found for the given organizer ID:', receiver_id);
            return new NextResponse(
                JSON.stringify({ error: 'User ID not found for the given organizer ID' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const newMessage = await db.client.collection("messages").create({
            sender_id,
            receiver_id: user_id,
            message,
        });

        console.log('Message created successfully:', newMessage);
        return NextResponse.json({ success: true, message: newMessage });
    } catch (err: any) {
        console.error('Error processing request:', err);
        return new NextResponse(
            JSON.stringify({ error: err.message || 'Failed to process request' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
