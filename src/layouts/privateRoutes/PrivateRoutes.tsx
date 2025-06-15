import { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes(page: ReactNode) {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? page : <Navigate to="/login" />;
}
