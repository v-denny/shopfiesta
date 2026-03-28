import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  // Grab the auth state from Redux
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1. Wait for Firebase to finish checking cookies
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 2. If they are NOT logged in, kick them to the login page
  if (!isAuthenticated) {
    // state={{ from: location }} remembers where they were trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. If they ARE logged in, let them through to the page!
  return children;
};

export default ProtectedRoute;