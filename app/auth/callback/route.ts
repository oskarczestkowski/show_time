import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const email = requestUrl.searchParams.get("email");
    const password = requestUrl.searchParams.get("password");
    const origin = requestUrl.origin;

    if (email && password) {
        const pb = new PocketBase('http://127.0.0.1:8090');
        try {
            // Autoryzacja użytkownika za pomocą emaila i hasła
            const authData = await pb.collection('users').authWithPassword(email, password);

            if (authData) {
                console.log('Authenticated with PocketBase:', authData);
                // Możesz ustawić sesję użytkownika tutaj, jeśli jest to wymagane
                // np. ustawienie ciasteczka sesji
            } else {
                console.log('Authentication failed');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    }

    // URL do przekierowania po zakończeniu procesu autoryzacji
    return NextResponse.redirect(`${origin}/protected`);
}
