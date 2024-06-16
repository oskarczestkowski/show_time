// pages/api/events.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function GET(request: NextRequest) {
    try {
        const events = await db.client.collection("event").getFullList();
        
        console.log('Fetched events:', events);
        return NextResponse.json(events);
    } catch (err: any) {
        console.error('Error fetching events:', err);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to fetch events' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
