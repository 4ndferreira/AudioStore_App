import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useMediaQuery } from "../../hooks/useMediaQuery";
const Welcome = lazy(() => import("../../pages/welcome/Welcome"));
const Login = lazy(() => import("../../pages/login/Login"));

export default function LoginRoutes() {
  const { isAuthenticated } = useAuth();
  const isDesktop = useMediaQuery();

  return isAuthenticated 
  ? <Navigate to="/" />
  : (isDesktop ? <Welcome />: <Login />);
}
