import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const Signup = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate signup, then log the user in immediately
      dispatch(login({ name: email.split('@'), email }));
      navigate('/dashboard');
    }
  };

  return (
    <div className="w-full h-full flex bg-gray-50">
      
      {/* Left Promotional Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-teal-800 text-white flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://via.placeholder.com/800x800')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-teal-800 text-2xl font-bold">SF</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">Unlock a World of Festive Deals </h1>
          <p className="text-teal-100 text-lg">
            ShopFiesta brings the joy of celebrations to your shopping experience. 
          </p>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create an account </h2>
            <p className="text-gray-600 text-sm">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-medium">Log in </Link>
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="shopfiesta@example.com "
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[rgb(100,106,232)] hover:bg-[rgb(80,86,180)] text-white font-medium py-3 rounded-md transition-colors"
            >
              Next 
            </button>
          </form>

          <div className="mt-8 mb-6 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400 text-sm">OR </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* SSO Buttons omitted for brevity - they are identical to Login.jsx! */}
          <div className="space-y-3">
             <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-700 font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Sign Up with Google 
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-700 font-medium">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.31-.85 3.65-.72 1.55.15 2.61.79 3.25 1.76-3.15 1.83-2.61 5.86.35 7.15-.65 1.54-1.35 2.92-2.33 3.98zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Sign Up with Apple 
            </button>
          </div>

          <p className="mt-8 text-xs text-center text-gray-500 leading-relaxed">
            By clicking "Next", "Sign Up with Google" or "Sign Up with Apple" you agree to our Terms of Use and acknowledge that you have read and understand our Privacy Policy. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;