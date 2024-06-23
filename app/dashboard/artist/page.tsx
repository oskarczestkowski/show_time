"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Navigation from '../components/Navigation';
import { Map } from "../components/Map";
import AsideLeft from '../components/AsideLeft';
import AsideRight from '../components/AsideRight';
import { useUser } from '@/app/contexts/UserContext';
import { User } from '@/types/types';
import MessageForm from '../components/messageForm';

export default function ProtectedPage() {
  const router = useRouter();
  const { user, setUser, fetchUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem('pb_auth');
        if (!authToken) {
          throw new Error('Authentication token is missing');
        }

        const response = await fetch('/api/dashboard/getEvents', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data.user);
        console.log(data.user)
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching user data:', err.message);
          setError(err.message);
        } else {
          console.error('Unexpected error:', err);
          setError('An unexpected error occurred');
        }
        setLoading(false);
      }
    };

    if (!user) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [router, setUser, user]);

  useEffect(() => {
    if (!loading && (!user || error)) {
      router.push('/login');
    }
  }, [loading, user, error, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return null; // or a redirect to login
  }

  return (
    <div className="h-screen">
      <Navigation user={user} />
      <div className="flex h-full pt-12 justify-center">
        <Map />
        <AsideLeft />
        <AsideRight appUser={user} />

      </div>
    </div>
  );
}
