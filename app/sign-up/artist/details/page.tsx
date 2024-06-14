'use client';

import React from 'react';
import {useUser}  from '@/app/contexts/UserContext';
import ArtistForm from '../../components/ArtistForm';

export default function DetailsPage() {

  return (
    <div>
      <h1>Artist Details</h1>
       <ArtistForm/>
    </div>
  );
};


