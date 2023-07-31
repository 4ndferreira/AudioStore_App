import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//Components
import Loader from './components/loader/Loader'
import CartProvider from './store/CartProvider'
import PrivateWrapper from './layouts/PrivateWrapper'
//CSS
import './App.css'

const Login = lazy(() => import('./pages/login/Login'))
const Home = lazy(() => import('./pages/home/Home'))
const Search = lazy(() => import('./pages/search/Search'))
const Products = lazy(() => import('./pages/products/Products'))
const Product = lazy(() => import('./pages/product/Product'))
const ShoppingCart = lazy(() => import('./pages/shoppingCart/ShoppingCart'))
const NotFound = lazy(()=> import('./pages/notFound/NotFound'))

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
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
          </Routes>
        </Suspense>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App