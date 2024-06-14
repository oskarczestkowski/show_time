"use server"

import PocketBase from 'pocketbase';

export const handleFormSubmit = async (formData: FormData, setIsRegisterFinished: React.Dispatch<boolean>) => {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        console.log('Received form data:', { email, password });

        if (!email || !password) {
            throw new Error("Email or password is missing");
        }

        const pb = new PocketBase('http://127.0.0.1:8090');

        const data = {
            email: email,
            password: password,
            passwordConfirm: password,
            role: "organizer"
        };

        console.log('Prepared data:', data);

        // Tworzenie nowego użytkownika
        const record = await pb.collection('users').create(data);
        console.log('User created:', record);

        // Autoryzacja użytkownika
        const authData = await pb.collection('users').authWithPassword(email, password);
        console.log('Authenticated:', authData);

        setIsRegisterFinished(true);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error during user creation or authentication:', error.message);
            console.error('Stack trace:', error.stack);
            throw error; // Rzuć błąd dalej, aby mógł być złapany w komponencie React
        } else {
            console.error('Unexpected error', error);
            throw new Error('Unexpected error occurred'); // Rzuć błąd jako instancję Error
        }
    }
};
