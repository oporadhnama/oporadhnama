import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Wraps admin routes. Redirects to /admin/login if no valid token exists.
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
