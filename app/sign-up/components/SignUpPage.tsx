'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '@/app/contexts/UserContext';

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam) {
      setRole(roleParam);
    }
  }, [searchParams]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!role) {
      setError('Role is not defined');
      return;
    }

    try {
      const form = { email, password, role };
      const response = await fetch('/api/artist/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to register user');
        return;
      }

      const data = await response.json();
      console.log('Registered user data:', data);

      // Store the token in localStorage or state
      localStorage.setItem('pb_auth', data.authToken);
      setUser(data);

      // Redirect to details page if registration is successful
      if (role === "artist") {
        router.push('artist/details');
      } else if (role === "organizer") {
        router.push('place-owner/details');
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError('Failed to register user');
    }
  };

  return (
    <form onSubmit={onSubmit} className="animate-in p-4 flex-1 flex flex-col w-full justify-center gap-2 text-foreground border-2 border-yellow-600">
      <label className="text-md text-amber-200" htmlFor="email">Email</label>
      <input
        className="px-2 py-1 bg-inherit border border-yellow-600 placeholder:text-gray-300"
        name="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label className="text-md text-amber-200" htmlFor="password">Password</label>
      <input
        className="px-2 py-1 bg-inherit border border-yellow-600 placeholder:text-gray-300"
        type="password"
        name="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="animate-btn-primary my-4 sm:text-amber-200 border-amber-200 px-2 py-1 text-foreground mb-2 font-bold text-xl">
        Sign Up
      </button>
    </form>
  );
}

export default SignUpPage;
