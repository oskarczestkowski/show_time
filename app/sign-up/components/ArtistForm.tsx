'use client';
import { useEffect, useState } from 'react';
import { UploadButton } from '@/utils/uploadthing';
import React from 'react';
import { useUser } from '@/app/contexts/UserContext';
import { useRouter } from 'next/navigation';

export default function ArtistForm() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [stage_name, setStageName] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [name, setFullName] = useState<string>('');
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('/api/artist/signup/genres');
        const data = await response.json();
        setGenres(data);
      } catch (err) {
        console.error('Failed to fetch genres', err);
      }
    };

    fetchGenres();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      console.error('User is not set');
      return;
    }

    const authToken = localStorage.getItem('pb_auth');
    console.log(authToken)

    if (!authToken) {
      setError('Authentication token is missing');
      return;
    }

    try {
      const form = { user_id: user.id, name, stage_name, genre, imgUrl };
      const response = await fetch('/api/artist/signup/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setError('Failed to submit artist details');
        return;
      }

      const data = await response.json();
      console.log(data);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to submit artist details');
    }
  };

  return (
    <form onSubmit={onSubmit} className="animate-in p-4 flex-1 flex flex-col w-full justify-center gap-2 text-foreground border-2 border-yellow-600">
      <label className="text-md text-amber-200" htmlFor="photo">Upload your photo</label>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => setImgUrl(res[0].url)}
        className="border border-yellow-600 p-2"
        onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)}
      />
      <label className="text-md text-amber-200" htmlFor="stage_name">Stage Name</label>
      <input
        className="px-2 py-1 bg-inherit border border-yellow-600 placeholder:text-gray-300"
        name="stageName"
        value={stage_name}
        onChange={(e) => setStageName(e.target.value)}
        placeholder="Enter your stage name"
        required
      />
      <label className="text-md text-amber-200" htmlFor="name">Full Name</label>
      <input
        className="px-2 py-1 bg-inherit border border-yellow-600 placeholder:text-gray-300"
        name="name"
        value={name}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Enter your full name"
        required
      />
      <label className="text-md text-amber-200" htmlFor="genre">Genre</label>
      <select
        className="px-2 py-1 bg-inherit border border-yellow-600 placeholder:text-gray-300"
        name="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      >
        <option value="" disabled>Select your genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.name}>{genre.name}</option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="animate-btn-primary my-4 sm:text-amber-200 border-amber-200 px-2 py-1 text-foreground mb-2 font-bold text-xl">
        Sign Up
      </button>
      {user && (
        <div className="mt-4 p-2 border border-yellow-600">
          <h3 className="text-amber-200">Current User</h3>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
        </div>
      )}
    </form>
  );
}
