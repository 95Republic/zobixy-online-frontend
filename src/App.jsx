import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shops from './pages/Shops';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import React, { useEffect } from 'react';
import { get_category } from './store/reducers/homeReducer';
import { useDispatch } from 'react-redux';
import CategoryShop from './pages/CategoryShop';
import SearchProducts from './pages/SearchProducts';
import Payment from './pages/Payment';
import ProtectUser from './utilities/ProtectUser';
import Dashboard from './pages/Dashboard';
import Index from './components/dashboard/Index';
import Orders from './components/dashboard/Orders';
import ChangePassword from './components/dashboard/ChangePassword';
import Wishlist from './components/dashboard/Wishlist';
import OrderDetails from './components/dashboard/OrderDetails';
import Chat from './components/dashboard/Chat';
import ConfirmOrder from './pages/ConfirmOrder';
function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_category())
}, [])



  return (

    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/shops' element={<Shops/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/shipping' element={<Shipping/>} />
        <Route path='/payment' element={<Payment/>} />
        <Route path='/products?' element={<CategoryShop/>} />
        <Route path='/products/search?' element={<SearchProducts/>} />
        <Route path='/product/details/:slug' element={<ProductDetails/>} />
        <Route path='/order/confirm?' element={<ConfirmOrder/>} /> 


        <Route path='/dashboard' element={<ProtectUser/>} > 
        <Route path='' element={<Dashboard/>} > 
        <Route path='' element={<Index/>} />
        <Route path='my-orders' element={<Orders/>} />
        <Route path='change-password' element={<ChangePassword/>} />
        <Route path='my-wishlist' element={<Wishlist/>} />
        <Route path='order/details/:orderId' element={<OrderDetails/>} />
        <Route path='chat' element={<Chat/>} />
        <Route path='chat/:sellerId' element={<Chat/>} />
        
         </Route>
        
        </Route>
        
    </Routes>
    </BrowserRouter>
  
  );
}

export default App;
