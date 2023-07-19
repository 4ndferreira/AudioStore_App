import { BrowserRouter, Route, Routes } from 'react-router-dom'
//Components
import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'
import Search from './pages/search/Search'
import Products from './pages/products/Products'
import Product from './pages/product/Product'
import ShoppingCart from './pages/shoppingCart/ShoppingCart'
import CartProvider from './components/store/CartProvider'
//CSS
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route 
            path='/signin' 
            element={<Auth />} 
          />
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
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
