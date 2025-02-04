// src/components/ProtectedRoute.tsx

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  isAdmin: boolean;
}

export const ProtectedRoute = ({ children, isAdmin }: ProtectedRouteProps) => {
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
