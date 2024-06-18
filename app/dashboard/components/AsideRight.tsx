"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import UserAvatar from "./userAvatar";
import ToggleButton from "./ToggleButton";
import { User, Event } from "@/types/types";
import SocialMediaLinks from "./socialMediaLinks";
import BioSection from "./bioSection";
import NextUpcomingEvent from "./nextUpcomingEvent";

const AsideRight = ({ appUser }: { appUser: User }) => {
  const [isRender, setIsRender] = useState(true);
  const mainControls = useAnimation();
  const [profileData, setProfileData] = useState<any>({});
  const [socialMediaLinks, setSocialMediaLinks] = useState<any>({});
  const [bio, setBio] = useState<string>("");
  const [nextEvent, setNextEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (isRender) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isRender]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const authToken = localStorage.getItem('pb_auth');
      if (!authToken) {
        console.error('Authentication token is missing');
        return;
      }

      try {
        const response = await fetch(`/api/dashboard/profile/getUserProfileDetails`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'user_id': appUser.id,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData(data);
        setSocialMediaLinks(data.social_media_links || {});
        setBio(data.bio || "");
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [appUser.id]);

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        const authToken = localStorage.getItem('pb_auth');
        if (!authToken) {
          console.error('Authentication token is missing');
          return;
        }

        
        const response = await fetch(`/api/dashboard/getEvents/nextUpcomingEvent`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'user_id': appUser.id,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch next event');
        }

        const data = await response.json();
        setNextEvent(data.event);
      } catch (error) {
        console.error('Error fetching next event:', error);
      }
    };

    if (appUser.role === 'organizer') {
      fetchNextEvent();
    }
  }, [appUser.id, appUser.role]);

  const handleLinkChange = async (platform: string, link: string) => {
    const updatedLinks = { ...socialMediaLinks, [platform]: link };
    setSocialMediaLinks(updatedLinks);

    try {
      const response = await fetch('/api/dashboard/updateLinks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: appUser.id, socialMediaLinks: updatedLinks }),
      });

      if (!response.ok) {
        throw new Error('Failed to update social media links');
      }

      const data = await response.json();
      console.log('Updated social media links:', data);
    } catch (error) {
      console.error('Error updating social media links:', error);
    }
  };

  const handleBioChange = async (newBio: string) => {
    setBio(newBio);

    try {
      const response = await fetch('/api/dashboard/updateBio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: appUser.id, bio: newBio }),
      });

      if (!response.ok) {
        throw new Error('Failed to update bio');
      }

      const data = await response.json();
      console.log('Updated bio:', data);
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  return (
    <>
      <motion.aside
        variants={{
          hidden: { x: 260, opacity: 1 },
          visible: { x: 0, opacity: 1 },
        }}
        initial="visible"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0 }}
        className="flex fixed h-screen top-12 pt-2 right-0 z-40 max-w-xl"
      >
        <div className="relative h-full">
          <div className="h-full flex flex-col gap-4 items-center bg-slate-900 border-l border-amber-200 w-64 py-4 px-2">
            <UserAvatar user={appUser} />

            {appUser.role === 'artist' && (
              <>
                <p className="text-white font-bold">{profileData.stage_name}</p>
                <p className="text-white">{profileData.genre}</p>
                <SocialMediaLinks links={socialMediaLinks} onChange={handleLinkChange} />
                <BioSection bio={bio} onSave={handleBioChange} />
              </>
            )}
            {appUser.role === 'organizer' && (
              <>
                <p className="text-white font-bold">{profileData.name}</p>
                <p className="text-white">{profileData.company_name}</p>
                <SocialMediaLinks links={socialMediaLinks} onChange={handleLinkChange} />
                <BioSection bio={bio} onSave={handleBioChange} />
                <NextUpcomingEvent event={nextEvent} />
              </>
            )}
          </div>
        </div>
      </motion.aside>
      <ToggleButton isRender={isRender} onClick={() => setIsRender(!isRender)} side="right" />
    </>
  );
};

export default AsideRight;
