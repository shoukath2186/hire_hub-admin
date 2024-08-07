
import React from 'react';
import { Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  return isAdminAuthenticated() ? element : <Navigate to="/login" />;
};


const isAdminAuthenticated = (): boolean => {
    const admin = localStorage.getItem('adminInfo'); 
    return !!admin;
  };

export default ProtectedRoute;