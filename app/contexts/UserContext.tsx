'use client';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import db from '../db';

interface UserContextType {
  user: any;
  fetchUser: () => Promise<void>;
  setUser: (user: any) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const authToken = localStorage.getItem('pb_auth');
      if (!authToken) {
        setUser(null);
        return;
      }
      const userModel = await db.getUser(authToken);
      setUser(userModel);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
