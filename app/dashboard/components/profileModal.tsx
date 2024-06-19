// components/profileModal.tsx
import React from 'react';
import UserAvatar from './userAvatar';
import SocialMediaLinks from './socialMediaLinks';
import BioSection from './bioSection';
import NextUpcomingEvent from './nextUpcomingEvent';

interface ProfileModalProps {
  profile: any;
  onClose: () => void;
  isOpen: boolean;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onClose, isOpen }) => {
  if (!isOpen) return null;

  const user = profile.user;
  const socialMediaLinks = user.social_media_links || {};
  const bio = user.bio || '';
  const nextEvent = profile.nextEvent;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-4 rounded shadow-lg w-96">
        <button onClick={onClose} className="text-right">Close</button>
        <div className="flex flex-col items-center gap-4">
          <UserAvatar user={user} />
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.role}</p>
          <SocialMediaLinks links={socialMediaLinks} editable={false} />
          <BioSection bio={bio} editable={false} />
          {user.role !== 'artist' && (
            <>
              <h2 className="text-lg font-semibold mt-4">Next Upcoming Event</h2>
              <NextUpcomingEvent event={nextEvent} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
