// components/RedirectIfAuthenticated.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
}

const RedirectIfAuthenticated: React.FC<RedirectIfAuthenticatedProps> = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const isAuthenticated = (): boolean => {
    const user = localStorage.getItem('adminInfo');
    return !!user;
  };

export default RedirectIfAuthenticated;
