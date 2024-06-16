// pages/api/dashboard/messages/getMessage/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function GET(request: NextRequest) {
    try {
        const user_id = request.headers.get('user_id'); // or extract from auth token

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
            filter: `receiver_id='${user_id}'`,
        });

        console.log('Fetched messages:', messages);

        // Fetch emails for senders
        const uniqueSenderIds = [...new Set(messages.map((msg: any) => msg.sender_id))];
        const senderEmails = await Promise.all(uniqueSenderIds.map(async (sender_id: string) => {
            try {
                const sender = await db.client.collection("users").getFirstListItem(`id='${sender_id}'`);
                console.log(`Fetched email for sender_id ${sender_id}:`, sender?.email || 'Unknown sender');
                return { sender_id, email: sender?.email || 'Unknown sender' };
            } catch (error) {
                console.error(`Error fetching email for sender_id ${sender_id}:`, error);
                return { sender_id, email: 'Unknown sender' };
            }
        }));

        const emailMap = senderEmails.reduce((acc: any, { sender_id, email }) => {
            acc[sender_id] = email;
            return acc;
        }, {});

        const messagesWithEmails = messages.map((msg: any) => ({
            ...msg,
            sender_email: emailMap[msg.sender_id] || 'Unknown sender',
        }));

        console.log('Messages with sender email:', messagesWithEmails);

        return NextResponse.json(messagesWithEmails);
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

