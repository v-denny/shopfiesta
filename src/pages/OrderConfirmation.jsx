import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');   // Grab the session_id from the URL
  const [countdown, setCountdown] = useState(3); //State for our countdown timer

  useEffect(() => {
    // SECURITY CHECK: If there is no Stripe session ID, kick them back to the home page
    if (!sessionId) {
      // 1. Start a countdown timer for the UI
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // 2. Redirect them after 3 seconds so they have time to read the message
      const redirect = setTimeout(() => {
        navigate('/'); 
      }, 3000);

      // Cleanup timers if the component unmounts
      return () => {
        clearInterval(timer);
        clearTimeout(redirect);
      };
    }
  }, [sessionId, navigate]);

  // UI FOR UNAUTHORIZED USERS (Replaces the white screen)
  if (!sessionId) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        {/* Popup Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-red-100 transform transition-all">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Session</h2>
          <p className="text-gray-600 mb-6">
            You cannot access this page directly. Redirecting to the homepage in <span className="font-bold text-[rgb(100,106,232)]">{countdown}</span> seconds...
          </p>
          {/* Loading Dots */}
          <div className="flex justify-center space-x-2">
             <div className="h-2 w-2 bg-[rgb(100,106,232)] rounded-full animate-bounce"></div>
             <div className="h-2 w-2 bg-[rgb(100,106,232)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
             <div className="h-2 w-2 bg-[rgb(100,106,232)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const orderDetails = {
    orderNumber: sessionId.slice(-10).toUpperCase(), 
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), 
    total: 110.00, 
    method: 'Visa **** 1234', 
    deliveryDate: 'November 3, 2023', 
    shippingAddress: '123 Fiesta Lane, Celebration City, CA 90210' 
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Main Message */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Purchase!</h1> 
      <p className="text-gray-600 mb-10">
        You will receive a confirmation email shortly with details about your order. 
      </p>

      {/* Order Summary Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-12 text-left">
        <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-900">Order Summary</h2> 
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Order Number</p> 
            <p className="text-gray-900 font-medium">{orderDetails.orderNumber}</p> 
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Date</p> 
            <p className="text-gray-900 font-medium">{orderDetails.date}</p> 
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Total Paid</p> 
            <p className="text-[rgb(100,106,232)] font-bold">${orderDetails.total.toFixed(2)}</p> 
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Payment Method</p> 
            <p className="text-gray-900 font-medium">{orderDetails.method}</p> 
          </div>
        </div>

        {/* Delivery Info Box */}
        <div className="mx-8 mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h3 className="text-[rgb(100,106,232)] font-bold mb-2">Estimated Delivery</h3> 
          <p className="text-gray-900 font-medium mb-1">Your order is estimated to be delivered by: {orderDetails.deliveryDate}</p> 
          <p className="text-sm text-gray-500">Shipping to: {orderDetails.shippingAddress}</p> 
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/products" 
          className="bg-[rgb(100,106,232)] hover:opacity-90 text-white font-bold px-10 py-4 rounded-md transition-all shadow-md"
        >    Continue Shopping 
        </Link>
        <Link 
          to="/dashboard" 
          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold px-10 py-4 rounded-md transition-all">
          View Order History 
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;