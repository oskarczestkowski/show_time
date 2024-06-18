// components/NextUpcomingEvent.tsx
import React from 'react';
import { Event } from '@/types/types';

interface NextUpcomingEventProps {
  event: Event | null;
}

const NextUpcomingEvent: React.FC<NextUpcomingEventProps> = ({ event }) => {
  if (!event) {
    return <p className="text-white">No upcoming events</p>;
  }

  return (
    <div className="text-white">
      <h3 className="font-bold">Next Upcoming Event</h3>
      <p><strong>Name:</strong> {event.name}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Address:</strong> {event.address}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
    </div>
  );
};

export default NextUpcomingEvent;
