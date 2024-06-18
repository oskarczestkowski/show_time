// types/types.ts
export type UserRole = 'artist' | 'organizer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  avatar: string | null;
  stage_name?: string;
  name?: string;
  genre?: string;
  bio?: string;
  company_name?: string;
  social_media_links?: Record<string, string>
  // Add other relevant user properties
}


// types.ts

export interface Event {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  date: string;
  description: string;
  name: string;
  organizer_id: string;
  // other event properties
}

// types/types.ts
export interface Message {
  id: string;
  sender_id: string;
  sender_email: string; // Add this line
  receiver_id: string;
  message: string;
  created: string;
}

