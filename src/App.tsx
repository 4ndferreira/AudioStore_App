//React
import { lazy, useEffect } from "react";
//React Router DOM
import { BrowserRouter, Route, useLocation } from "react-router-dom";
//Components
import CartProvider from "./store/CartProvider";
import MobileExclusiveRoutes from "./layouts/mobileExclusiveRoutes/MobileExclusiveRoutes";
import AnimatedRoutes from "./layouts/animatedRoutes/AnimatedRoutes";
//Lazy Components
import PrivateRoutes from "./layouts/privateRoutes/PrivateRoutes";
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

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ChangeOverFlow />
      <CartProvider>
        <AnimatedRoutes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={PrivateRoutes(<Home />)} />
          <Route path="/products" element={PrivateRoutes(<Products />)} />
          <Route element={<MobileExclusiveRoutes />}>
            <Route path="/search" element={PrivateRoutes(<Search />)} />
            <Route path="/products/:id" element={PrivateRoutes(<Product />)} />
            <Route path="/cart" element={PrivateRoutes(<ShoppingCart />)} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </AnimatedRoutes>
      </CartProvider>
    </BrowserRouter>
  );
}