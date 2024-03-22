import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../login/submit-button";
import { FiMusic } from "react-icons/fi";
import { MdOutlinePlace } from "react-icons/md";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <main className="main my-4 sm:my-24 animate-in">
      <p className="text-2xl">You are...</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-be items-center gap-8 text-center">
        <Link
          href="/sign-up/artist"
          className="animate-btn-primary p-8
        flex flex-col gap-4
        text-base sm:text-xl 
        justify-center items-center
        w-44 h-44
        sm:w-64 sm:h-64"
        >
          <FiMusic size={72} />
          Artist
        </Link>
        <p className="sm:hidden block">
          Or
        </p>
        <Link
          href="/sign-up/place-owner"
          className="animate-btn-primary p-8 
          text-base sm:text-xl 
        flex flex-col gap-4
        justify-center items-center
        w-44 h-44
        sm:w-64 sm:h-64"
        >
          <MdOutlinePlace size={72} />
          Place owner
        </Link>
      </div>
    </main>
  );
}
