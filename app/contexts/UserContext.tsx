// contexts/UserContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import db from '../db';
import { User } from '@/types/types';// Adjust the import path as necessary

interface UserContextType {
  user: User | null;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const authToken = localStorage.getItem('pb_auth');
      if (!authToken) {
        setUserState(null);
        return;
      }

      const userModel = await db.getUser(authToken);
      if (!userModel) {
        setUserState(null);
        return;
      }

      const user: User = {
        id: userModel.id,
        email: userModel.email,
        role: userModel.role,
        avatar: userModel.avatar || null,
      };

      setUserState(user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUserState(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('pb_auth');
    setUserState(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser, setUser: setUserState, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
