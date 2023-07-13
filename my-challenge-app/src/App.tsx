import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'

import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'
import Search from './pages/Search'
import Products from './pages/products/Products'
import Product from './pages/product/Product'
import ShoppingCart from './pages/shoppingCart/ShoppingCart'

import './App.css'

const App = () => {

  axios
    .get("https://run.mocky.io/v3/58d95159-6053-48c1-9351-32a1b1325a4f")
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

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
