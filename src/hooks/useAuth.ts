'use client'

import { useRouter } from 'next/navigation';
import { useAuth as useAuthContext } from '@/context/AuthContext';

export const useAuth = () => {
  const context = useAuthContext();
  const router = useRouter();

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const requireAuth = () => {
    if (!context.isAuthenticated) {
      router.push('/login');
    }
  };

  const requireGuest = () => {
    if (context.isAuthenticated) {
      router.push('/dashboard');
    }
  };

  return {
    ...context,
    requireAuth,
    requireGuest
  };
};