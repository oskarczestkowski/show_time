// pages/api/profile/nextEvent.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function GET(request: NextRequest) {
    try {
        const user_id = request.headers.get('user_id');

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

        const organizerRecord = await db.client.collection("organizers").getFirstListItem(`user_id="${user_id}"`)
        console.log("Organizer record " + organizerRecord.id)

        const events = await db.client.collection("event").getFullList({
            filter: `organizer_id="${organizerRecord.id}"`,
            sort: 'date',
            limit: 1,
        });

        const nextEvent = events.length > 0 ? events[0] : null;

        return NextResponse.json({ event: nextEvent });
    } catch (error) {
        console.error('Error fetching next event:', error);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to fetch next event' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
