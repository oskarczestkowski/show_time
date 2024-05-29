"use client"
import { redirect } from "next/navigation";
import { SubmitButton } from "../../login/submit-button"
import PocketBase from 'pocketbase';
import React from "react";

export const RegisterPage = ({ setIsRegisterFinished }: { setIsRegisterFinished: React.Dispatch<boolean> }) => {

    return (
        <form action={async (formData) => {
            "use server"
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const pb = new PocketBase('http://127.0.0.1:8090');

            const data = {
                "email": email,
                "password": password,
                "passwordConfirm": password,
                "role": "organizer"
            };

            try {
                const record = await pb.collection('users').create(data);
                const authData = await pb.collection('users').authWithPassword(
                    email,
                    password,
                );

            } catch (error) {
                console.log(error)
            }
            setIsRegisterFinished(true)
        }}
            className="animate-in p-4 flex-1 flex flex-col w-full justify-center 
      gap-2 text-foreground border-2 border-yellow-600"
        >
            <label className="text-md text-amber-200" htmlFor="email">
                Email
            </label>
            <input
                className="px-2 py-1 bg-inherit border border-yellow-600  placeholder:text-gray-300"
                name="email"
                placeholder="your@email.com"
                required
            />
            <label className="text-md text-amber-200" htmlFor="password">
                Password
            </label>
            <input
                className="px-2 py-1 bg-inherit border  border-yellow-600  placeholder:text-gray-300"
                type="password"
                name="password"
                placeholder="••••••••"
                required
            />

            <SubmitButton
                className="animate-btn-primary my-4 sm:text-amber-200 border-amber-200 px-2 py-1 text-foreground mb-2 font-bold text-xl"
                pendingText="Signing Up..."
            >
                Next Step
            </SubmitButton>


        </form>
    )
}