import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../UserSide/Pages/Home/Home';

import Products from '../UserSide/Pages/Products/Products';

import Cart from '../UserSide/Pages/Cart/Cart';
import Login from '../login/Login';
import Signup from '../login/Signup';
import SingleProduct from '../UserSide/Pages/SingleProductPage/SingleProduct';
import Profile from '../UserSide/Pages/Profile/Profile';
import PrivateRouteUser from './PrivateRouteUser';
import Wishlist from '../UserSide/Pages/Wishlist/Wishlist';
import LandingPage from '../UserSide/Pages/LandingPage/LandingPage';

export const AllRoutes = () => {
  return (
    <Routes>
      {/* User Side Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/product/:products" element={<Products />} />
      <Route
        path="/product/:products/:id"
        element={
          <PrivateRouteUser>
            <SingleProduct />
          </PrivateRouteUser>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route
        path="/cart"
        element={
          <PrivateRouteUser>
            <Cart />
          </PrivateRouteUser>
        }
      />
      <Route
        path="/wishlist"
        element={
          <PrivateRouteUser>
            <Wishlist />
          </PrivateRouteUser>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRouteUser>
            <Profile />
          </PrivateRouteUser>
        }
      />
  
    </Routes>
  );
};
