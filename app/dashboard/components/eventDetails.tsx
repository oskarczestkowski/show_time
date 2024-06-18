// components/EventDetails.tsx
import React, { useState } from 'react';
import { Event, UserRole } from '@/types/types';
import MessageForm from './messageForm';

interface EventDetailsProps {
  event: Event;
  senderRole: UserRole;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, senderRole }) => {
  const [showMessageForm, setShowMessageForm] = useState(false);

  const handleSendMessage = () => {
    setShowMessageForm(true);
  };

  return (
    <div className="event-details">
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleString()}</p>
      <p>{event.address}</p>
      <button onClick={handleSendMessage}>Send Message</button>
      {showMessageForm && (
        <MessageForm
          receiverId={event.organizer_id}
          senderRole={senderRole}
          context="eventDetails"  // Pass the context
          onMessageSent={() => setShowMessageForm(false)}
        />
      )}
    </div>
  );
};

export default EventDetails;
