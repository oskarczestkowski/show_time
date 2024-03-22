import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/app/login/submit-button";
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
    <main className="flex-1 my-4 flex m-auto flex-col items-center w-full px-8 sm:max-w-md justify-center gap-2">
    
      <div className="flex text-2xl justify-start m-auto pl-4 gap-1">
             Place Owner  <MdOutlinePlace size={20} />
      </div>
      <form
        className="animate-in p-4 flex-1 flex flex-col w-full justify-center 
      gap-2 text-foreground border-2 border-yellow-600"
      >
        <label className="text-md" htmlFor="email">
          First Name
        </label>
        <input
          className="px-4 py-2 bg-inherit border border-yellow-600 mb-6 placeholder:text-amber-200"
          name="firstName"
          placeholder="Your first name"
          required
        />
         <label className="text-md" htmlFor="email">
          Last Name
        </label>
          <input
          className="px-4 py-2 bg-inherit border border-yellow-600 mb-6 placeholder:text-amber-200"
          name="lastName"
          placeholder="Your last name"
          required
        />
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="px-4 py-2 bg-inherit border border-yellow-600 mb-6 placeholder:text-amber-200"
          name="email"
          placeholder="your@email.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="px-4 py-2 bg-inherit border  border-yellow-600 mb-6 placeholder:text-amber-200"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signUp}
          className="text-yellow-600 animate-btn-primary px-4 py-2 text-foreground mb-2 font-bold text-xl"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </main>
  );
}
