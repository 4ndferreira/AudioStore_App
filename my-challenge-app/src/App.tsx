//React
import { lazy, useEffect } from 'react'
//React Router DOM
import { BrowserRouter, Route, useLocation } from 'react-router-dom'
//Hook
import { useMediaQuery } from './hooks/useMediaQuery'
//Components
import CartProvider from './store/CartProvider'
import PrivateWrapper from './layouts/PrivateWrapper'
import MobileExclusiveRoutes from './layouts/MobileExclusiveRoutes'
import AnimatedRoutes from './layouts/AnimatedRoutes'
//Lazy Components
const Welcome = lazy(() => import('./pages/welcome/Welcome'))
const Login = lazy(() => import('./pages/login/Login'))
const Home = lazy(() => import('./pages/home/Home'))
const Search = lazy(() => import('./pages/search/Search'))
const Products = lazy(() => import('./pages/products/Products'))
const Product = lazy(() => import('./pages/product/Product'))
const ShoppingCart = lazy(() => import('./pages/shoppingCart/ShoppingCart'))
const NotFound = lazy(()=> import('./pages/notFound/NotFound'))
//CSS
import './App.css'

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
  const isDesktop = useMediaQuery();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ChangeOverFlow />
      <CartProvider>
        <AnimatedRoutes>
          <Route element={<PrivateWrapper />}>
            <Route path="/" element={isDesktop ? <Welcome /> : <Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route element={<MobileExclusiveRoutes />}>
              <Route path="/search" element={<Search />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/cart" element={<ShoppingCart />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </AnimatedRoutes>
      </CartProvider>
    </BrowserRouter>
  );
}