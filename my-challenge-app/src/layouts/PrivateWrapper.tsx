import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "../firebase/Config";

const PrivateWrapper = () => {
  const location = useLocation();

  return auth.currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default PrivateWrapper;
