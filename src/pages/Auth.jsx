import {signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword /*, sendEmailVerification */} from 'firebase/auth';
import {auth, googleProvider} from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate an API call and login success
    try {
      let res;

      if (isLogin){
        res = await signInWithEmailAndPassword(auth, email, password);
        // if (!res.user.emailVerified) {
        //   alert("Please verify your email before logging in. Check your inbox for the verification link.");
        //   return;
        // }
        console.log("Logged in successfully!");
      } else{
        res = await createUserWithEmailAndPassword(auth, email, password);
        // await sendEmailVerification(res.user);
        // alert("Account created successfully! Please check your email to verify your account before logging in.");
        // return; // Don't log in yet
        console.log("Account created successfully!");
      }
      dispatch(login({ 
      email: res.user.email, 
      uid: res.user.uid 
    }));
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Auth Error:", error.message);
      if (error.code === 'auth/email-already-in-use') {
        alert("This email is already registered. Please log in instead.");
      } else if (error.code === 'auth/wrong-password') {
        alert("Incorrect password. Please try again.");
      } else if (error.code === 'auth/user-not-found') {
        alert("No account found with this email. Please create an account.");
      } else {
        alert("Authentication failed. Please check your details and try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
       // dispatch(login({ name: user.displayName, email: user.email }));
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <div className="w-full h-full flex bg-gray-50 ">
      
      {/* Left Promotional Side (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-teal-800 text-white flex-col justify-center items-center p-12 relative">
        {/* Placeholder for the festive background graphic */}
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-2">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{isLogin ? 'Log in' : 'Create an account'}</h2>
            <p className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "} 
              <button 
      type="button"
      onClick={() => setIsLogin(!isLogin)} // This flips the state
      className="text-blue-600 hover:underline font-medium cursor-pointer"
    >
      {isLogin ? 'Create an account' : 'Log in'}
    </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors"
            >
              {isLogin ? 'Sign In' : 'Sign Up'} 
            </button>
          </form>

          <div className="mt-8 mb-6 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400 text-sm">OR </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="space-y-3">
            <button type='button' onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-700 font-medium cursor-pointer">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              {isLogin ? 'Sign In with Google' : 'Sign Up with Google'} 
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-700 font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.31-.85 3.65-.72 1.55.15 2.61.79 3.25 1.76-3.15 1.83-2.61 5.86.35 7.15-.65 1.54-1.35 2.92-2.33 3.98zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Sign In with Apple 
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-700 font-medium">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Use Single Sign-On (SSO) 
            </button>
          </div>

          <p className="mt-4 text-xs text-center text-gray-500 leading-relaxed">
            By clicking "Next", "Sign In with Google" or "Sign In with Apple" you agree to our Terms of Use and acknowledge that you have read and understand our Privacy Policy. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;