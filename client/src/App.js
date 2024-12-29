import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from './pages/home/Home.js';

import LoginSignup from './pages/login/Login.js';
import ProductPage from './pages/product/product.js';
import CartPage from './pages/cart/cartPage.js';
import AddProduct from './components/addProduct.js';
import Shop from './pages/shop/shop.js';
import Navbar from './components/Navbar.js';
import CheckoutPage from './pages/checkoutPage/checkOutPage.js';
import OrdersPage from './pages/order/orderPage.js';
import { useState } from 'react';
function App() {
  
  const [open,setOpen]=useState(false);
  return (
    <div className='bg-gradient-to-br from-[#f6edff] to-[#f5eefd]'>
      
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path={`/product/:productSlug`} element={<ProductPage/>}/>
        <Route path={`/cart`} element={<CartPage/>}/>
        <Route path={`/addProduct`} element={<AddProduct open={true} setOpen={setOpen}/>}/>
        <Route path={`/shop`} element={<Shop/>}/>
        <Route path={`/checkout`} element={<CheckoutPage/>}/>
        <Route path={`/orders`} element={<OrdersPage/>} />
      </Routes>
     </BrowserRouter>
     
      
    </div>
  );
}

export default App;
