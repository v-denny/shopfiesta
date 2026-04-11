import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import apiClient from "../api/axiosConfig";
import { toggleWishlistAsync } from "../store/wishlistSlice"; 


const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  // Local state for options
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("30ml");
  const [scent, setScent] = useState("Unscented");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isWishlisted = product && product._id ? wishlistItems.includes(String(product._id)) : false;

  const fetchProduct = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await apiClient.get(`/products/${id}`);

        setProduct(res.data);
      } catch (error) {
        console.error("Fetch failed:", error.message);
        setError("Unable to load product details. Please try again later.");
      } finally {
        setLoading(false);  
      }
    }, [id]);

    useEffect(() => {
    if (id) fetchProduct();
  }, [id, fetchProduct]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 font-medium">
        Error: {error}
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    // Dispatch to Redux, including the selected quantity
    dispatch(addToCart({ 
      id: product._id,           // Map _id to id
  name: product.title,       // Map title to name (Crucial!)
  image: product.image,      // Ensure this is 'image'
  price: product.price, 
  quantity, 
  size, 
  scent
     }));
  };

  const handleWishlistToggle = () => {
    if (!user) return alert("Please login to add to wishlist");
    dispatch(toggleWishlistAsync({ uid: user.uid, productId: String(product._id) }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <Link to="/products" className="hover:text-blue-600">
          Shop
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="hover:text-blue-600 cursor-pointer capitalize">
          {product.category}
        </span>
        <span className="mx-2">&gt;</span>
        <span className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-xs">
          {product.title}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left: Product Image */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-100 rounded-2xl aspect-square relative overflow-hidden flex items-center justify-center p-8 border border-gray-100 shadow-sm">
            {/* Best Seller Badge */}
            <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10"> 
              Best Seller
            </span>
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* <span className="text-gray-400">Product Image Placeholder</span> */}
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-1/2 flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.title}
        </h1>
        <p className="text-gray-600 text-lg mb-4">{product.category}</p>

        <div className="flex items-end gap-4 mb-4">
          <span className="text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {/* Multiply price by 1.2 to create a fake "original" price for the UI */}
          <span className="text-lg text-gray-400 line-through mb-1">
            ${(product.price).toFixed(2)}
          </span>
        </div>

        {/* Ratings & Reviews */}

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center text-yellow-400">
            ★★★★<span className="text-gray-300">★</span>
            <span className="text-gray-600 ml-1">{product.rating?.rate}</span>
          </div>
          <span>{product.rating?.count} Reviews</span>
          {/* Assuming sold count is 3x the rating count for demo purposes */}
          <span>
            {product.rating?.count ? product.rating.count * 3 : 0} Sold
          </span>
        </div>

        {/* Perks */}
        <div className="flex flex-col gap-2 mb-8 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Free shipping on orders over $49USD
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Free easy returns
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Size
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>30ml</option>
              <option>50ml</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Scent
            </label>
            <select
              value={scent}
              onChange={(e) => setScent(e.target.value)}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Unscented</option>
              <option>Rose</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-4 py-3 font-medium text-gray-900 border-x border-gray-300 min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[rgb(100,106,232)] hover:opacity-90 text-white font-medium py-3 rounded-md transition-colors"
          >
            Add to Cart
          </button>
          <button 
          onClick={handleWishlistToggle}
          className="px-4 py-3 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
            <svg 
              className={`w-6 h-6 transition-colors ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`}              fill={isWishlisted ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Details Accordion (Simplified as a list for now) */}
        <div className="border-t border-gray-200 pt-8 mt-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Product Details
          </h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {product.description}
          </p>
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">
            Key Benefits
          </h4>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Premium quality guaranteed</li>
            <li>Fast, reliable shipping</li>
            <li>30-day return policy</li>
            <li>24/7 Customer Support</li>
            <li>Secure payment processing</li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  )
};

export default ProductDetail;
