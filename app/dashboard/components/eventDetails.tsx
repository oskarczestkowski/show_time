import React, { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { Event, UserRole } from '@/types/types';
import MessageForm from './messageForm';
import ProfileModal from './profileModal';

interface EventDetailsProps {
  event: Event;
  senderRole: UserRole;
  setIsRenderModal: Dispatch<SetStateAction<boolean>>;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, senderRole, setIsRenderModal }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white p-4 rounded shadow-lg w-11/12 md:w-1/4 max-h-screen overflow-auto relative">
        <button className="absolute top-2 right-2 text-black" onClick={() => setIsRenderModal(false)}>
          &times;
        </button>
        <div className="">
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
      </div>
    </div>

  );
};

export default EventDetails;
