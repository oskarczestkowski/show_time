// /app/api/dashboard/messages/sendMessage/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";
import { UserRole } from "@/types/types";

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

        // Fetch sender details to determine their role
        const senderRecord = await db.client.collection("users").getFirstListItem(`id="${sender_id}"`);
        console.log('Sender record:', senderRecord);
        const senderRole: UserRole = senderRecord.role;
        console.log('Sender role:', senderRole);

        let recipientUserId: string | null = null;

        if (senderRole === 'artist') {
            console.log('Fetching organizer record...');
            // If the sender is an artist, the receiver_id is an organizer ID
            try {
                const organizerRecord = await db.client.collection("organizers").getFirstListItem(`id="${receiver_id}"`);
                console.log('Organizer record:', organizerRecord);
                recipientUserId = organizerRecord.user_id;
            } catch (err) {
                console.error('Error fetching organizer record:', err);
            }
        } else if (senderRole === 'organizer') {
            console.log('Fetching artist record...');
            // If the sender is an organizer, the receiver_id is an artist ID
            try {
                const artistRecord = await db.client.collection("users").getFirstListItem(`id="${receiver_id}"`);
                console.log('Artist record:', artistRecord);
                recipientUserId = artistRecord.user_id;
            } catch (err) {
                console.error('Error fetching artist record:', err);
            }
        }

        if (!recipientUserId) {
            console.error('User ID not found for the given receiver ID:', receiver_id);
            return new NextResponse(
                JSON.stringify({ error: 'User ID not found for the given receiver ID' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const newMessage = await db.client.collection("messages").create({
            sender_id,
            receiver_id: recipientUserId,
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
