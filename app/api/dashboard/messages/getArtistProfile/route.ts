import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/db';

export async function GET(request: NextRequest) {
    const userId = request.headers.get('artist_id');
    console.log(userId)

    if (!userId) {
        console.error('Artist ID is required');
        return new NextResponse(
            JSON.stringify({ error: 'Artsit ID is required' }),
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
                JSON.stringify({ error: 'Artist not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Fetch data from the users table
        const artistRecord = await db.client.collection('artists').getFirstListItem(`user_id="${userId}"`);
        console.log("Artist record: " + artistRecord)
        if (!artistRecord) {
            return new NextResponse(
                JSON.stringify({ error: 'User not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Fetch the next upcoming event for the organizer


        // Combine data into a profile object
        const profile = {
            artist: artistRecord,
            user: {
                name: userRecord.name,
                role: userRecord.role,
                avatar: userRecord.avatar,
                social_media_links: userRecord.social_media_links,
                bio: userRecord.bio,
            },
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
