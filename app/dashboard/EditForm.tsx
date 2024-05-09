"use client"
import { AppUser } from '@/types/database.types';
import React, { FormEvent, useState } from 'react';
import { FaInstagram, FaSoundcloud, FaTiktok, FaYoutube } from 'react-icons/fa';

function SocialMediaForm({appUser} :{appUser:AppUser}) {
  const urls = {
    instagram_url: "",
    youtube_url: '',
    soundcloud_url: '',
    tiktok_url: ''
  };

  const handleChange = (e:React.ChangeEvent) => {
 
  };

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    console.log('Submitted URLs:');
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <div className='flex gap-2 items-center'>
        <label htmlFor="instagram_url"><FaInstagram size={20} /></label>
        <input
          className='m-auto bg-gray-700 rounded-sm w-32 mr-6'
          type="text"
          id="instagram_url"
          name="instagram_url"
          value={urls.instagram_url}
          onChange={handleChange}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <label htmlFor="youtube_url"><FaYoutube size={20} /></label>
        <input
          className='m-auto bg-gray-700 rounded-sm w-32 mr-6'
          type="text"
          id="youtube_url"
          name="youtube_url"
          value={urls.youtube_url}
          onChange={handleChange}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <label htmlFor="soundcloud_url"><FaSoundcloud size={20} /></label>
        <input
          className='m-auto bg-gray-700 rounded-sm w-32 mr-6'
          type="text"
          id="soundcloud_url"
          name="soundcloud_url"
          value={urls.soundcloud_url}
          onChange={handleChange}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <label htmlFor="tiktok_url"><FaTiktok size={20} /></label>
        <input
          className='m-auto bg-gray-700 rounded-sm w-32 mr-6'
          type="text"
          id="tiktok_url"
          name="tiktok_url"
          value={urls.tiktok_url}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SocialMediaForm;
