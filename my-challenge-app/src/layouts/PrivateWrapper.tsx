//React
import { useEffect, useState } from "react";
//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Config";
//React Router Dom
import { Navigate, Outlet, useLocation } from "react-router-dom";
//Components
import Loader from "../components/loader/Loader";

const PrivateWrapper = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=> {
      if(user) {
        const uid = user.uid;
        console.log('uid', uid)
        setIsAuthenticated(true)
      }else{
        setIsAuthenticated(false)
        console.log('user is logged out')
      }
    })
    return ()=> unsubscribe();
  }, [])

  if(isAuthenticated === null) {
    return <Loader />
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default PrivateWrapper;
