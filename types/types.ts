// types.ts
export type UserRole = 'artist' | 'organizer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  avatar: string | null; // Add avatar field
  // Add other relevant user properties
}
