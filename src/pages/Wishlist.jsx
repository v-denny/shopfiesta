import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toggleWishlistAsync } from '../store/wishlistSlice';
import axios from 'axios';

const Wishlist = () => {
  const dispatch = useDispatch();

  const { items: wishlistIds } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  const initialWishlist = [];

  const [wishlistItems, setWishlistItems] = useState(initialWishlist);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      setLoading(true);
      try {
        const promises = wishlistIds.map(id =>
          axios.get(`https://dummyjson.com/products/${id}`).then(res => ({
             id: res.data.id,
             name: res.data.title,
             price: res.data.price,
             image: res.data.thumbnail
          }))
        );
        const products = await Promise.all(promises);
        setWishlistItems(products);
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
      }
      setLoading(false);
    };

    if (wishlistIds.length > 0) {
      fetchWishlistProducts();
    } else {
      setWishlistItems([]);
    }
  }, [wishlistIds]);

  const handleRemove = (id) => {
    dispatch(toggleWishlistAsync({ uid: user.uid, productId: String(id) }));  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => {
      dispatch(addToCart(item));
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
      
      {/* Left Sidebar Navigation */}
      <aside className="hidden md:block w-1/5 flex-shrink-0">
        <nav className="flex flex-col space-y-1 text-gray-600 text-sm font-medium">
          <Link to="/" className="px-4 py-2 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            Categories
          </Link>
          <div className="pl-12 flex flex-col space-y-2 mt-2 mb-4 text-gray-500 font-normal">
            <Link to="/products?category=electronics" className="hover:text-blue-600">Electronics</Link>
            <Link to="/products?category=clothing" className="hover:text-blue-600">Clothing</Link>
            <Link to="/products?category=home-garden" className="hover:text-blue-600">Home & Garden</Link>
            <Link to="/products?category=books" className="hover:text-blue-600">Books</Link>
          </div>
          
          <Link to="/dashboard" className="px-4 py-3 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors flex items-center gap-3 border-t border-gray-100">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            Orders
          </Link>
          <Link to="/dashboard" className="px-4 py-3 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors flex items-center gap-3 border-t border-gray-100">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Account
          </Link>
          <Link to="/settings" className="px-4 py-3 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors flex items-center gap-3 border-t border-gray-100">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Settings
          </Link>

          <div className="mt-12 pt-4 border-t border-gray-100">
            <button className="px-4 py-2 text-gray-500 hover:text-red-600 transition-colors">
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Right Content Area */}
      <main className="w-full md:w-4/5">
        
        {/* Header Options */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            My Wishlist <span className="text-gray-400 text-lg font-normal ml-2">({wishlistItems.length} items)</span>
          </h1>
          
          <div className="flex items-center gap-6 text-sm">
            <button 
              onClick={handleAddAllToCart}
              className="flex items-center gap-2 font-medium text-gray-700 hover:text-[rgb(100,106,232)] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Add All to Cart
            </button>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Sort by:</span>
              <select className="border-none bg-transparent text-gray-900 font-medium focus:ring-0 cursor-pointer">
                <option>Date Added (Newest)</option>
                <option>Price (Low to High)</option>
                <option>Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Wishlist Grid */}
        {wishlistItems.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group relative">
                
                {/* Product Image */}
                <div className="w-full aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-sm">Image</span>
                  </div>
                </div>

                {/* Product Info */}
                <h3 className="text-gray-900 font-medium truncate mb-1">{item.name}</h3>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[rgb(100,106,232)]">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  
                  {/* Actions (Add to Cart & Remove) */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="text-gray-400 hover:text-[rgb(100,106,232)] transition-colors"
                      aria-label="Add to cart"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </button>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default Wishlist;