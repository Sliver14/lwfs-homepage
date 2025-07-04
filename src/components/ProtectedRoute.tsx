'use client';

import React from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}) => {
  const { userId, userLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !userId) {
      router.push('/signin');
    }
  }, [userId, userLoading, router]);

  // Show loading while checking authentication
  if (userLoading) {
    return <>{fallback}</>;
  }

  // Redirect to signin if not authenticated
  if (!userId) {
    return null; // Will redirect in useEffect
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute; 