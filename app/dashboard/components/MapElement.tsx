"use client";
import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { TbLetterS } from "react-icons/tb";
import dynamic from 'next/dynamic';

const CalendarElement = dynamic(() => import('./CalendarElement'), { ssr: false });

const EventMarker = ({ text }: any) => (
  <div className="marker">
    <TbLetterS size={30} />
  </div>
);

const MapElement = () => {
  const defaultProps = {
    center: {
      lat: 54.373905264586014,
      lng: 18.647007740230656
    },
    zoom: 14
  };

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/dashboard/getEvents', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch events');
        }

        const data = await response.json();
        console.log('Fetched events:', data); // Log fetched events
        setEvents(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching events:', err.message);
          setError(err.message);
        } else {
          console.error('Unexpected error:', err);
          setError('An unexpected error occurred');
        }
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-full w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD75EWmDGLt6lq4KlZmniElKohX5GSIXjA" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {events.map(event => (
          <EventMarker
            key={event.id}
            lat={event.latitude}
            lng={event.longitude}
            text={event.name}
          />
        ))}
        {/* Hardcoded marker for testing */}
        <EventMarker
          key="hardcoded"
          lat={54.373905264586014}
          lng={18.647007740230656}
          text="Test"
        />
      </GoogleMapReact>
    </div>
  );
};

export default MapElement;
