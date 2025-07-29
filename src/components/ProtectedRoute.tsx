import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserTier } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredTier?: UserTier;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requiredTier
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredTier && user && user.tier !== requiredTier && user.tier !== 'premium') {
    return <Navigate to="/upgrade" replace />;
  }

  return <>{children}</>;
};