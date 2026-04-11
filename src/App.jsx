import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import {login, logout} from './store/authSlice';
import { fetchCartAsync } from './store/cartSlice'; 
import { fetchWishlistAsync } from './store/wishlistSlice'; 
// import axios from 'axios';
import apiClient from './api/axiosConfig';


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';

// We will uncomment these imports as we build the files!
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';
import Support from './pages/Support';
import About from './pages/AboutUs';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import ShippingReturns from './pages/ShippingReturns';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }));
        try {
        await apiClient.post('/users/sync-user', {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        });
        console.log("User synced to MongoDB successfully");
        dispatch(fetchCartAsync(user.uid));
        dispatch(fetchWishlistAsync(user.uid));

      } catch (err) {
        console.error("Failed to sync user to MongoDB:", err);     
     }
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

   const hideNavAndFooter = location.pathname === '/auth';

  return (
    <div className="flex flex-col min-h-screen">
      {/* 4. Conditionally render Navbar */}
      {!hideNavAndFooter && <Navbar />}
      
      {/* main wrapper with flex-grow ensures the footer is pushed to the bottom */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/products" element={<ProductListing />} /> 
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/shipping-returns" element={<ShippingReturns />} />
          <Route path="/cancel" element={<Cart />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> 
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        </Routes>
      </main>

      {/* 4. Conditionally render Footer */}
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

export default App;