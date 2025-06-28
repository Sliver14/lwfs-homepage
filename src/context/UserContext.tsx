'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // <--- Import AxiosError here

interface UserDetails {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface UserContextType {
  userId: string | null;
  userDetails: UserDetails | null;
  userLoading: boolean;
  userError: string | null;
  logout: () => void; // add this
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      setUserLoading(true);
      try {
        const response = await axios.get('/api/auth/tokenverify', { withCredentials: true });
        console.log('Token verify response:', response.data);
        const { userId, user } = response.data;
        setUserId(userId);
        setUserDetails(user);
        setUserError(null);
        console.log('loggedin userDetails:', user);
        console.log('loggedin userId:', userId);
      } catch (error: unknown) { // <--- CHANGED FROM 'any' TO 'unknown'
        console.error('Token verification error:', error);
        setUserId(null);
        setUserDetails(null);

        let errorMessage = 'Failed to verify token'; // Default error message

        if (axios.isAxiosError(error)) { // <--- Type narrowing for AxiosError
          // If it's an AxiosError, check for response data or use the general message
          errorMessage = error.response?.data?.error || error.message;
        } else if (error instanceof Error) { // <--- Type narrowing for standard Error
          // If it's a standard JavaScript Error
          errorMessage = error.message;
        }
        // If it's neither, the default 'Failed to verify token' will be used.

        setUserError(errorMessage);
      } finally {
        setUserLoading(false);
      }
    };

    verifyToken();
  }, []);

  const logout = () => {
    setUserId(null);
    setUserDetails(null);
    setUserError(null);
    // Optionally, you might want to clear cookies or local storage here
    // e.g., document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Or if using SecureStore/AsyncStorage in React Native, clear it there.
    // For Next.js withCredentials, clearing the cookie on the server-side via an API route
    // might be more robust if this logout is client-side only.
  };

  return (
    <UserContext.Provider value={{ userId, userDetails, userLoading, userError, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};