import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    /* We use py-20 to ensure space from the Navbar and Footer */
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center py-20">
      
      {/* 1. The Graphic Section - Margin Bottom 12 (3rem) */}
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-12 shadow-sm">
        <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      {/* 2. The Error Text Section - Margin Bottom 6 (1.5rem) for title, 12 (3rem) for text */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
        Oops! Page Not Found. {/* [cite: 209] */}
      </h1>
      <p className="text-lg text-gray-600 mb-12 max-w-md mx-auto leading-relaxed">
        It seems the page you were looking for is enjoying it's fiesta ;) {/* [cite: 210] */}
      </p>

      {/* 3. Primary Action Buttons - Margin Bottom 20 (5rem) to separate from help box */}
      <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full max-w-md mx-auto justify-center">
        <Link 
          to="/" 
          className="bg-[rgb(100,106,232)] hover:opacity-90 text-white font-medium px-8 py-3 rounded-md transition-all shadow-md sm:w-60 text-center"
        >
          Go Back Home {/* [cite: 211] */}
        </Link>
        <Link 
          to="/products" 
          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-8 py-3 rounded-md transition-all shadow-sm sm:w-60 text-center"
        >
          Explore Categories {/* [cite: 212] */}
        </Link>
      </div>

      {/* 4. Secondary Support Section */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 max-w-lg w-full shadow-xl shadow-gray-100/50">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Need More Help? {/*  */}</h2>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
          If you can't find what you need, contact our friendly support team. {/* [cite: 223, 224] */}
        </p>
        <Link 
          to="/contact" 
          className="text-[rgb(100,106,232)] font-bold hover:text-blue-800 flex items-center justify-center gap-2 group transition-colors"
        >
          Contact Support {/* [cite: 225] */}
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

    </div>
  );
};

export default NotFound;