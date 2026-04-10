import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToCartAsync } from '../store/cartSlice';
import { toggleWishlistAsync } from '../store/wishlistSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // 1. Get the user from Redux auth state
  const { user } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items); 
  const isWishlisted = wishlistItems.includes(String(product.id));
  
  const handleWishlistToggle = (e) => {
    e.preventDefault(); 
    if (!user) {
      alert("Please login to add items to your wishlist!");
      return;
    }

    dispatch(toggleWishlistAsync({ 
      uid: user.uid, 
      productId: String(product.id) 
    }));
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating to the product page when clicking the button
    dispatch(addToCart({ ...product, quantity: 1 })); 

    // 3. Database Sync: Only if the user is logged in
    if (user?.uid) {
      dispatch(addToCartAsync({ 
        uid: user.uid, 
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        } 
      }));
    }
  }; 

  return ( 
  <div className="relative group"> {/* Wrapper to handle absolute positioning of heart */}
      
      {/* 4. The Wishlist Button */}
      <button 
        onClick={handleWishlistToggle}
        className="absolute top-6 right-6 z-20 p-2 bg-white rounded-full shadow-md transition-all duration-300 hover:scale-110"
        aria-label="Toggle Wishlist"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transition-colors ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
          fill={isWishlisted ? "currentColor" : "none"} 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

    <Link to={`/products/${product.id}`} className="group block">
      <div className=" group flex flex-col w-full h-full relative pt-2">
        {/* Product Image Placeholder */}
        <div className="relative aspect-square bg-gray-100 flex items-center justify-center p-6 m-3 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">          
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="bg-gray-200 px-5 pb-5 pt-12 -mt-8 flex flex-col flex-grow shadow-sm transition-shadow duration-300 group-hover:shadow-md">
          <h3 className="text-gray-800 font-medium truncate">{product.name}</h3>
          <div className="flex items-center gap-1 mt-1 mb-2">
            
            <div className="flex items-center text-yellow-400">
            ★★★★<span className="text-gray-300">★</span>
            </div>
            <span className="text-gray-500 text-sm">{product.rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <button 
              onClick={handleAddToCart}
              className="bg-blue-50 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="Add to cart">
                
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  </div>
  );
};

export default ProductCard;