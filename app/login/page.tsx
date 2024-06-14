"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from '@/app/contexts/UserContext';

function Login() {
  const router = useRouter();
  const { setUser } = useUser();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('pb_auth', data.token);
      setUser(data.user);

      // Redirect based on user role
      if (data.user.role === 'artist') {
        router.push('/dashboard/artist');
      } else if (data.user.role === 'organizer') {
        router.push('/dashboard/organizer');
      }
    } catch (err: any) {
      console.error('Login error:', err.message);
      setError(err.message);
    }
  };

  return (
    <main className="flex-1 my-4 flex m-auto flex-col items-center w-full px-8 sm:max-w-md justify-center gap-2">
      <div className="flex text-2xl justify-start m-auto pl-4 gap-1 text-amber-200">
        Sign In
      </div>
      <form
        className="animate-in p-4 flex-1 flex flex-col w-full justify-center 
        gap-2 text-foreground border-2 border-yellow-600"
        onSubmit={handleSubmit}
      >
        <label className="text-md text-amber-200" htmlFor="email">
          Email
        </label>
        <input
          className="px-2 py-1 bg-inherit border border-yellow-600 placeholder:text-gray-300"
          name="email"
          placeholder="your@email.com"
          required
        />
        <label className="text-md text-amber-200" htmlFor="password">
          Password
        </label>
        <input
          className="px-2 py-1 bg-inherit border border-yellow-600 placeholder:text-gray-300"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="animate-btn-primary my-4 sm:text-amber-200 border-amber-200 px-2 py-1 text-foreground mb-2 font-bold text-xl">
          Sign In
        </button>
      </form>
    </main>
  );
}

export default Login;
