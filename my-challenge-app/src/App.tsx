//React
import { Suspense, lazy, useEffect } from 'react'
//React Router DOM
import { BrowserRouter, Route, useLocation } from 'react-router-dom'
//Components
import Loader from './components/loader/Loader'
import CartProvider from './store/CartProvider'
import PrivateWrapper from './layouts/PrivateWrapper'
//CSS
import './App.css'
import AnimatedRoutes from './layouts/AnimatedRoutes'
//Lazy Components
const Login = lazy(() => import('./pages/login/Login'))
const Home = lazy(() => import('./pages/home/Home'))
const Search = lazy(() => import('./pages/search/Search'))
const Products = lazy(() => import('./pages/products/Products'))
const Product = lazy(() => import('./pages/product/Product'))
const ShoppingCart = lazy(() => import('./pages/shoppingCart/ShoppingCart'))
const NotFound = lazy(()=> import('./pages/notFound/NotFound'))

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

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Suspense fallback={<Loader />}>
          <ScrollToTop />
          <ChangeOverFlow />
          <AnimatedRoutes>
            <Route 
              path='/signin' 
              element={<Login />} 
            />
            <Route 
              element={<PrivateWrapper />}
            >
              <Route 
                path='/'
                element={<Home />} 
              />
              <Route 
                path='/search' 
                element={<Search />} 
              />
              <Route 
                path='/products' 
                element={<Products />} 
              />
              <Route 
                path='/products/:id' 
                element={<Product />} 
              />
              <Route 
                path='/cart' 
                element={<ShoppingCart />} 
              />
              <Route 
                path='*' 
                element={<NotFound />} 
              />
            </Route>
          </AnimatedRoutes>
        </Suspense>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App