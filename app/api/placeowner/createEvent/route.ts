import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import db from "@/app/db";

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');
        let authToken = authHeader?.split(' ')[1]; // Extract token from 'Bearer <token>'

        if (authToken) {
            authToken = authToken.trim(); // Trim any extraneous spaces or line breaks
        }

        if (!authToken) {
            console.error('Authentication token is missing');
            return new NextResponse(
                JSON.stringify({ error: 'Authentication token is missing' }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        console.log("Received auth token:", authToken);

        const isAuthenticated = await db.isAuthenticated(authToken);
        console.log("Is authenticated:", isAuthenticated);
        if (!isAuthenticated) {
            console.error('Authentication token is invalid');
            return new NextResponse(
                JSON.stringify({ error: 'Authentication token is invalid' }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const { user_id, street_address, city, state, postal_code, country, date, description, event_name } = await request.json();

        // Validate the input
        if (!user_id || !street_address || !city || !state || !postal_code || !country || !date || !description || !event_name) {
            return new NextResponse(
                JSON.stringify({ error: 'All fields are required' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        console.log("Request body:", { user_id, street_address, city, state, postal_code, country, date, description, event_name });

        // Fetch the organizer_id using the user_id
        const organizerRecord = await db.client.collection("organizers").getFirstListItem(`user_id='${user_id}'`);

        if (!organizerRecord) {
            return new NextResponse(
                JSON.stringify({ error: 'Organizer not found for the given user_id' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const organizer_id = organizerRecord.id;

        // Składanie pełnego adresu
        const fullAddress = `${street_address}, ${city}, ${state}, ${postal_code}, ${country}`;

        // Geocoding address to get latitude and longitude
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: fullAddress,
                key: 'AIzaSyD75EWmDGLt6lq4KlZmniElKohX5GSIXjA'
            }
        });

        if (response.data.status !== 'OK') {
            console.error('Geocoding error:', response.data);
            return new NextResponse(
                JSON.stringify({ error: 'Failed to geocode address' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const location = response.data.results[0].geometry.location;
        console.log("Geocoded location:", location);

        // Create event record
        const eventDetails = await db.client.collection("event").create({
            organizer_id,
            name: event_name,
            description,
            date,
            address: fullAddress,
            latitude: location.lat,
            longitude: location.lng
        });

        console.log("Event created successfully:", eventDetails);
        return NextResponse.json({ success: true, eventDetails });
    } catch (err: any) {
        console.error('Error processing request:', err);
        return new NextResponse(
            JSON.stringify({ error: err.message || 'Failed to process request' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
