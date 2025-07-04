'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

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
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Cache key for localStorage
const USER_CACHE_KEY = 'lwfs_user_cache';
const USER_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CachedUser {
  userId: string;
  userDetails: UserDetails;
  timestamp: number;
}

const getCachedUser = (): CachedUser | null => {
  try {
    const cached = localStorage.getItem(USER_CACHE_KEY);
    if (!cached) return null;
    
    const parsed: CachedUser = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is still valid
    if (now - parsed.timestamp < USER_CACHE_DURATION) {
      return parsed;
    }
    
    // Cache expired, remove it
    localStorage.removeItem(USER_CACHE_KEY);
    return null;
  } catch {
    return null;
  }
};

const setCachedUser = (userId: string, userDetails: UserDetails) => {
  try {
    const cached: CachedUser = {
      userId,
      userDetails,
      timestamp: Date.now()
    };
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(cached));
  } catch {
    // Ignore localStorage errors
  }
};

const clearCachedUser = () => {
  try {
    localStorage.removeItem(USER_CACHE_KEY);
  } catch {
    // Ignore localStorage errors
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const verifyToken = useCallback(async (useCache: boolean = true) => {
    // Try to use cached data first if requested
    if (useCache && !isInitialized) {
      const cached = getCachedUser();
      if (cached) {
        setUserId(cached.userId);
        setUserDetails(cached.userDetails);
        setUserError(null);
        setUserLoading(false);
        setIsInitialized(true);
        return;
      }
    }

    setUserLoading(true);
    try {
      const response = await axios.get('/api/auth/tokenverify', { withCredentials: true });
      console.log('Token verify response:', response.data);
      const { userId, user } = response.data;
      
      setUserId(userId);
      setUserDetails(user);
      setUserError(null);
      
      // Cache the user data
      setCachedUser(userId, user);
      
      console.log('loggedin userDetails:', user);
      console.log('loggedin userId:', userId);
    } catch (error: unknown) {
      console.error('Token verification error:', error);
      setUserId(null);
      setUserDetails(null);
      clearCachedUser();

      let errorMessage = 'Failed to verify token';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setUserError(errorMessage);
    } finally {
      setUserLoading(false);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Initial load - try cache first, then API
  useEffect(() => {
    verifyToken(true);
  }, [verifyToken]);

  const refreshUser = useCallback(async () => {
    await verifyToken(false); // Force API call, don't use cache
  }, [verifyToken]);

  const logout = useCallback(async () => {
    try {
      // Call logout API if it exists
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout API error:', error);
    }
    
    // Clear local state and cache
    setUserId(null);
    setUserDetails(null);
    setUserError(null);
    clearCachedUser();
    
    // Redirect to signin
    window.location.href = '/signin';
  }, []);

  return (
    <UserContext.Provider value={{ 
      userId, 
      userDetails, 
      userLoading, 
      userError, 
      logout, 
      refreshUser 
    }}>
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