// types.ts
export type UserRole = 'artist' | 'organizer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  avatar: string | null; // Add avatar field
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
  receiver_id: string;
  message: string;
  created: string;
}


