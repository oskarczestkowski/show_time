import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function GET(request: NextRequest) {
    try {
        await db.client.admins.authWithPassword('admin@admin.com', 'oskar725204')
        
        const collection = await db.client.collections.getOne('artists');
        const genreField = collection.schema.find(field => field.name === 'genre');
        if (genreField && genreField.options && genreField.options.values) {
            const genres = genreField.options.values.map((value: string) => ({ id: value, name: value }));
            return NextResponse.json(genres);
        } else {
            throw new Error("Genres field not found or has no values");
        }
    } catch (err) {
        console.error('Error fetching genres:', err);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch genres' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}
