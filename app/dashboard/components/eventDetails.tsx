import React, { useState } from 'react';
import { Event, UserRole } from '@/types/types';
import MessageForm from './messageForm';
import ProfileModal from './profileModal';

interface EventDetailsProps {
  event: Event;
  senderRole: UserRole;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, senderRole }) => {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  const handleSendMessage = () => {
    setShowMessageForm(true);
  };

  const handleViewProfile = async () => {
    setShowProfileModal(true);
    try {
      const response = await fetch(`/api/dashboard/profile/getUserProfileDetails/getOrganizerProfile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'organizer_id': event.organizer_id
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch organizer profile');
      }
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching organizer profile:', error);
    }
  };

  return (
    <div className="profile-details fixed top-1/2 right-1/2 bg-white">
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleString()}</p>
      <p>{event.address}</p>
      <button onClick={handleSendMessage}>Send Message</button>
      {showMessageForm && (
        <MessageForm
          receiverId={event.organizer_id}
          senderRole={senderRole}
          context="eventDetails"
          onMessageSent={() => setShowMessageForm(false)}
        />
      )}
      <button onClick={handleViewProfile}>View Organizer Profile</button>
      {showProfileModal && profileData && (
        <ProfileModal
          profile={profileData}
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
};

export default EventDetails;
