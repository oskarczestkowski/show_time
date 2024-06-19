// components/GetArtistProfile.tsx
import React, { useState } from 'react';
import ProfileModal from './profileModal';

interface GetArtistProfileProps {
  artistId: string;
}

const GetArtistProfile: React.FC<GetArtistProfileProps> = ({ artistId }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  const handleViewProfile = async () => {
    setShowProfileModal(true);
    try {
      const response = await fetch(`/api/dashboard/messages/getArtistProfile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'artist_id': artistId
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch artist profile');
      }
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching artist profile:', error);
    }
  };

  return (
    <div>
      <button onClick={handleViewProfile}>View Artist Profile</button>
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

export default GetArtistProfile;
