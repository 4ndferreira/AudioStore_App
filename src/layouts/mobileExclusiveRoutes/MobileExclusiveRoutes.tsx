import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Navigate, Outlet } from 'react-router-dom';

export default function MobileExclusiveRoutes() {
  const isDesktop = useMediaQuery();
  return isDesktop ? <Navigate to="/"/> : <Outlet/>
}