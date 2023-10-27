//React
import { useEffect } from "react";
//React Router Dom
import { Outlet, useNavigate } from "react-router-dom";
//Firebase
import { auth } from "../firebase/Config";
//Component
import Loader from "../components/loader/Loader";

export default function PrivateWrapper() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const isLoginPage = location.pathname === "/";

  useEffect(() => {
    if (!user) {
      !isLoginPage && navigate("/", { state: { isPush: true } });
    }
  }, [isLoginPage, navigate, user]);

  return user || isLoginPage ? <Outlet /> : <Loader />
}