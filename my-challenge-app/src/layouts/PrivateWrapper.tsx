//React
import { useEffect, useState } from "react";
//React Router Dom
import { Outlet, Navigate, useLocation } from "react-router-dom";
//Firebase
import { auth } from "../firebase/Config";
import { onAuthStateChanged } from "firebase/auth";
//Component
import Loader from "../components/loader/Loader";

export default function PrivateWrapper() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setIsAuthenticated(user ? true : false)
    );
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <Loader />;
  } else {
    return isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
}
