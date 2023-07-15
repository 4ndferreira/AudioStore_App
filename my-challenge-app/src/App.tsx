import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'

import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'
import Search from './pages/search/Search'
import Products from './pages/products/Products'
import Product from './pages/product/Product'
import ShoppingCart from './pages/shoppingCart/ShoppingCart'

import './App.css'

const App = () => {

  axios
    .get("https://run.mocky.io/v3/58d95159-6053-48c1-9351-32a1b1325a4f")
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
