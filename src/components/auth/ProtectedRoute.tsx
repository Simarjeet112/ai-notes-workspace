'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@hooks/useAuth';
import Skeleton from '@components/ui/Skeleton';

/**
 * PROTECTED ROUTE WRAPPER
 * Ensures only authenticated users can access protected pages
 */

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
}) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      fallback || (
        <div className="w-full min-h-screen bg-neutral-950 p-6">
          <div className="space-y-4">
            <Skeleton height="2rem" width="60%" />
            <Skeleton height="1rem" width="100%" count={3} />
            <Skeleton height="10rem" width="100%" />
          </div>
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
