import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/app/login/submit-button";
import { FiMusic } from "react-icons/fi";
import PocketBase from 'pocketbase';


export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {


  const signUp = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const pb = new PocketBase('http://127.0.0.1:8090');

    const data = {
      "email": email,
      "password": password,
      "passwordConfirm": password,
      "role": "artist"
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
    return redirect("/sign-up/artist/details");

  }

  return (
    <main className="flex-1 my-4 flex m-auto flex-col items-center w-full px-8 sm:max-w-md justify-center gap-2">
      <div className="flex text-2xl justify-start m-auto pl-4 gap-2 text-amber-200">
        Create Artist Account  <FiMusic size={16} />
      </div>

      <form
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
          formAction={signUp}
          className="animate-btn-primary my-4 sm:text-amber-200 border-amber-200 px-2 py-1 text-foreground mb-2 font-bold text-xl"
          pendingText="Signing Up..."
        >
          Next Step
        </SubmitButton>

      </form>
    </main>
  );
}