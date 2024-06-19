// components/GetOrganizerProfile.tsx
import React, { useState } from 'react';
import ProfileModal from './profileModal';

interface GetOrganizerProfileProps {
  organizerId: string;
}

const GetOrganizerProfile: React.FC<GetOrganizerProfileProps> = ({ organizerId }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  const handleViewProfile = async () => {
    setShowProfileModal(true);
    try {
      const response = await fetch(`/api/dashboard/messages/getOrganizerProfile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'organizer_id': organizerId
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
    <div>
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

export default GetOrganizerProfile;
