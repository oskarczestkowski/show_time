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

        console.log('Fetching profile data for user_id:', user_id);

        const userRecord = await db.client.collection("users").getFirstListItem(`id="${user_id}"`);
        let profileData = { ...userRecord };

        if (userRecord.role === 'artist') {
            const artistRecord = await db.client.collection("artists").getFirstListItem(`user_id="${user_id}"`);
            profileData = { ...profileData, ...artistRecord };
        } else if (userRecord.role === 'organizer') {
            const organizerRecord = await db.client.collection("organizers").getFirstListItem(`user_id="${user_id}"`);
            profileData = { ...profileData, ...organizerRecord };
        }

        return NextResponse.json(profileData);
    } catch (error) {
        console.error('Error fetching profile data:', error);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to fetch profile data' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
