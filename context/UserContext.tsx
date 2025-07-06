'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
  country: string;
  picture: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUserState(JSON.parse(stored));
    setIsClient(true);
  }, []);

  const setUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUserState(user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUserState(null);
  };

  if (!isClient) return null;

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
};
