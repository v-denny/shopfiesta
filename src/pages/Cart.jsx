import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, removeFromCartAsync, decrementQuantity, incrementQuantity, fetchCartAsync, decrementQuantityAsync, incrementQuantityAsync } from '../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
// Get status and user info
  const { items, totalQuantity, status } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  // Calculations
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 8.00; // Free shipping over $100
  const tax = subtotal * 0.08; // Assuming 8% tax rate
  const orderTotal = subtotal + shipping + tax;
  
  const freeShippingThreshold = 100;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // NEW: Stripe Checkout Handler
  const handleCheckout = async () => {
    try {
      // 1. Call your backend to create a session
      // Make sure your backend route is: /api/payment/create-checkout-session
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid, // Sending Firebase UID so backend can find the user in MongoDB
        }),
      });

      const data = await response.json();

      if (data.url) {
        // 2. Redirect to Stripe's Hosted Page
        window.location.href = data.url;
      } else {
        alert("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Something went wrong with the payment server.");
    }
  };

  // Handle Delete with Database Sync
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
    // Database sync
    if (user?.uid) {
      dispatch(removeFromCartAsync({ uid: user.uid, productId }));
    }
  };

  const handleDecrement = (productId) => {
  // 1. Instant UI update
  dispatch(decrementQuantity(productId));
  
  // 2. Sync with MongoDB
  if (user?.uid) {
    dispatch(decrementQuantityAsync({ uid: user.uid, productId }));
  }
};

  const handleIncrement = (productId) => {
  // 1. Instant UI update
  dispatch(incrementQuantity(productId));
  
  // 2. Sync with MongoDB
  if (user?.uid) {
    dispatch(incrementQuantityAsync({ uid: user.uid, productId }));
  }
};

  //Handle Loading State (Prevents the "Blank/Black" screen)
  if (status === 'loading') {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(100,106,232)]"></div>
        <p className="mt-4 text-gray-600">Loading your festive finds...</p>
      </div>
    );
  }

  if (items.length === 0 && status !== 'loading') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center h-[60vh] flex flex-col items-center justify-center">
        <svg className="w-24 h-24 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any festive finds yet!</p>
        <Link to="/products" className="bg-[rgb(100,106,232)] hover:opacity-90 text-white font-medium px-8 py-3 rounded-md transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart ({totalQuantity} Items)</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Cart Items */}
        <div className="w-full lg:w-2/3">
          
          {/* Free Shipping Alert */}
          {amountToFreeShipping > 0 ? (
            <div className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-3 rounded-md mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>You're only <strong>${amountToFreeShipping.toFixed(2)}</strong> away from FREE shipping!</span>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-100 text-green-700 px-4 py-3 rounded-md mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>You've unlocked <strong>FREE shipping!</strong></span>
            </div>
          )}

          {/* Item List */}
          <div className="space-y-6">
            {items.map((item) => (
              <div key={`${item._id}-${item.size || 'default'}`} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 border border-gray-200 rounded-lg">
                
                {/* Image Placeholder */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 p-2">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain mix-blend-multiply" 
                  />
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <Link to={`/products/${item._id}`} className="text-lg font-bold text-gray-900 hover:text-blue-600 block mb-1">
                    {item.name}
                  </Link>
                  {(item.size || item.scent) && (
                    <p className="text-sm text-gray-500 mb-2">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.size && item.scent && <span className="mx-2">|</span>}
                      {item.scent && <span>Scent: {item.scent}</span>}
                    </p>
                  )}
                  <div className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                  
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                     onClick={() => handleDecrement(item._id)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >-</button>
                    <span className="px-3 py-1 font-medium text-gray-900 border-x border-gray-300 min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleIncrement(item._id)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >+</button>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => handleRemove(item._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>

                </div>
              </div>
            ))}
          </div>
          
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-gray-600 mb-6 border-b border-gray-200 pb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-medium text-gray-900">
                  {shipping === 0 ? <span className="text-green-600 uppercase text-sm font-bold">Free</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-900">Order Total</span>
              <span className="text-2xl font-bold text-[rgb(100,106,232)]">${orderTotal.toFixed(2)}</span>
            </div>

            {/* Promo Code */}
            <div className="mb-6 flex">
              <input 
                type="text" 
                placeholder="Promo Code" 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-r-md transition-colors text-sm font-medium">
                Apply
              </button>
            </div>

            <button 
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full bg-[rgb(100,106,232)] hover:opacity-90 text-white font-medium py-4 rounded-md transition-colors text-lg shadow-sm">
              Proceed to Checkout
            </button>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Secure Checkout
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;