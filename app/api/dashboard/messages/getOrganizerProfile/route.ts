import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/db';

export async function GET(request: NextRequest) {
    const userId = request.headers.get('organizer_id');
    console.log(userId)

    if (!userId) {
        console.error('Organizer ID is required');
        return new NextResponse(
            JSON.stringify({ error: 'Organizer ID is required' }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    try {
        // Fetch data from the organizer table
        const userRecord = await db.client.collection('users').getFirstListItem(`id="${userId}"`);
        console.log("User record: " + userRecord)
        if (!userRecord) {
            return new NextResponse(
                JSON.stringify({ error: 'Organizer not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Fetch data from the users table
        const organizerRecord = await db.client.collection('organizers').getFirstListItem(`user_id="${userId}"`);
        console.log("Organizer record: " + organizerRecord)
        if (!organizerRecord) {
            return new NextResponse(
                JSON.stringify({ error: 'User not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Fetch the next upcoming event for the organizer
        const events = await db.client.collection('event').getFullList({
            filter: `organizer_id="${organizerRecord.id}"`,
            sort: 'date',
            limit: 1,
        });
        const nextEvent = events.length > 0 ? events[0] : null;

        // Combine data into a profile object
        const profile = {
            organizer: organizerRecord,
            user: {
                name: userRecord.name,
                role: userRecord.role,
                avatar: userRecord.avatar,
                social_media_links: userRecord.social_media_links,
                bio: userRecord.bio,
            },
            nextEvent,
        };

        // Return the combined profile data
        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error fetching organizer profile:', error);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to fetch organizer profile' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
