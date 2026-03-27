import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import {login, logout} from './store/authSlice';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// We will uncomment these imports as we build the files!
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';
import Contact from './pages/ContactUs';
import About from './pages/AboutUs';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import FAQ from './pages/FAQ';
import ShippingReturns from './pages/ShippingReturns';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

   const hideNavAndFooter = location.pathname === '/signup' || location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {/* 4. Conditionally render Navbar */}
      {!hideNavAndFooter && <Navbar />}
      
      {/* main wrapper with flex-grow ensures the footer is pushed to the bottom */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Uncomment these as we create the files */}
          <Route path="/products" element={<ProductListing />} /> 
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping-returns" element={<ShippingReturns />} />
        </Routes>
      </main>
      {/* 4. Conditionally render Footer */}
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

export default App;