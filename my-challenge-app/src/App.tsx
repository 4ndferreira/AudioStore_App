//React
import { ReactNode, lazy, useEffect, useState } from "react";
//React Router DOM
import { BrowserRouter, Navigate, Route, useLocation } from "react-router-dom";
//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/Config";
//Hook
import { useMediaQuery } from "./hooks/useMediaQuery";
//Components
import CartProvider from "./store/CartProvider";
import MobileExclusiveRoutes from "./layouts/MobileExclusiveRoutes";
import AnimatedRoutes from "./layouts/AnimatedRoutes";
//Lazy Components
const Welcome = lazy(() => import("./pages/welcome/Welcome"));
const Login = lazy(() => import("./pages/login/Login"));
const Home = lazy(() => import("./pages/home/Home"));
const Search = lazy(() => import("./pages/search/Search"));
const Products = lazy(() => import("./pages/products/Products"));
const Product = lazy(() => import("./pages/product/Product"));
const ShoppingCart = lazy(() => import("./pages/shoppingCart/ShoppingCart"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));
//CSS
import "./App.css";

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

export const ChangeOverFlow = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.body.style.overflow = "auto";
  }, [pathname]);
  return null;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const isDesktop = useMediaQuery();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setIsAuthenticated(user ? true : false)
    );
    return () => unsubscribe();
  }, []);

  const PrivateRoute = (page: ReactNode) => {
    return isAuthenticated ? page : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ChangeOverFlow />
      <CartProvider>
        <AnimatedRoutes>
          <Route path="/login" element={isDesktop ? <Welcome /> : <Login />} />
          <Route path="/" element={PrivateRoute(<Home />)} />
          <Route path="/products" element={PrivateRoute(<Products />)} />
          <Route element={<MobileExclusiveRoutes />}>
            <Route path="/search" element={PrivateRoute(<Search />)} />
            <Route path="/products/:id" element={PrivateRoute(<Product />)} />
            <Route path="/cart" element={PrivateRoute(<ShoppingCart />)} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </AnimatedRoutes>
      </CartProvider>
    </BrowserRouter>
  );
}