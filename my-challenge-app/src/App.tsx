import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Auth from './pages/Auth'
import Home from './pages/Home'
import Search from './pages/Search'
import Products from './pages/Products'
import Product from './pages/Product'
import ShoppingCart from './pages/ShoppingCart'

import './App.css'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
      <Route 
          path='/SignIn' 
          element={<Auth />} 
        />
        <Route 
          path='/' 
          element={<Home />} 
        />
        <Route 
          path='/Search' 
          element={<Search />} 
        />
        <Route 
          path='/Products' 
          element={<Products />} 
        />
        <Route 
          path='/Products/:id' 
          element={<Product />} 
        />
        <Route 
          path='/Cart' 
          element={<ShoppingCart />} 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
