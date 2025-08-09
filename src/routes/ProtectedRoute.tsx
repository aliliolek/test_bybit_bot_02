import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  return children;
};

export default ProtectedRoute;
