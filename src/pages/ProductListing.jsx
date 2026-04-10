import React from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import axios from 'axios';

const ProductListing = () => {
  // Mock product data based on the design 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      setLoading(true);

      // ATTEMPT 1: Primary API
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        return;
      } catch (err) {
        console.warn("Primary API failed, trying fallback...", err.message);
      }

      // ATTEMPT 2: Fallback API
      const fallbackRes = await axios.get('https://dummyjson.com/products');
      const normalized = fallbackRes.data.products.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.thumbnail,
        category: item.category,
        rating: { rate: item.rating, count: item.reviews?.length || 150 }
      }));
      setProducts(normalized);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

    fetchProducts();
  }, []);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      
      {/* Left Sidebar: Filters  */}
      <aside className="w-full md:w-1/4 flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Filters</h2>
        
        <div className="space-y-6 divide-y divide-gray-200">
          {/* Product Type  */}
          <div className="pt-4 first:pt-0">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex justify-between items-center cursor-pointer">
              Product Type
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </h3>
            <div className="space-y-2">
              {["Men's Clothing", "Women's Clothing", 'Electronics', 'Jewelery'].map((type) => (
                <label key={type} className="flex items-center group cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Skin Concern  */}
          <div className="pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex justify-between items-center cursor-pointer">
              Skin Concern
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </h3>
          </div>

          {/* Price Range */}
          <div className="pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex justify-between items-center cursor-pointer">
              Price Range
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </h3>
            <div className="px-2 mt-4">
              <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$10.00</span>
                <span>$300.00</span>
              </div>
            </div>
          </div>

          {/* Rating  */}
          <div className="pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex justify-between items-center cursor-pointer">
              Rating
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                <span className="ml-2 text-sm text-gray-600">4 Stars & Up</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                <span className="ml-2 text-sm text-gray-600">3 Stars & Up</span>
              </label>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Content: Header & Product Grid */}
      <main className="w-full md:w-3/4">
        {/* Page Header */}
        <div className="mb-8 border-b border-gray-200 pb-4">
          <div className="flex text-sm text-gray-500 mb-2">
            <span>Home</span><span className="mx-2">&gt;</span><span>Shop</span><span className="mx-2">&gt;</span><span className="font-medium text-gray-900">Skincare</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Skincare Essentials</h1>
          <p className="text-gray-600">Explore our collection of high-quality skincare products designed to nourish, protect, and revitalize your skin. </p>
        </div>

        {/* Toolbar (Active Filters & Sort) */}
        <div className="flex flex-wrap justify-between items-center mb-6 text-sm">
          <div className="flex items-center text-gray-600">
            <span className="mr-2">Active Filters:</span> <span className="text-gray-400 italic">None 
            </span>
          </div>
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
            <select id="sort" className="border-gray-300 rounded-md text-gray-700 py-1 pl-2 pr-8 focus:ring-blue-500 focus:border-blue-500 bg-transparent">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={{
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating?.rate,
      reviewsCount: product.rating?.count
           }} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 space-x-2 text-sm">
          <button className="px-3 py-1 text-gray-500 hover:text-blue-600">&lt; Previous</button>
          <button className="px-3 py-1 font-bold text-blue-600 border-b-2 border-blue-600">1</button>
          <button className="px-3 py-1 text-gray-600 hover:text-blue-600">2</button>
          <button className="px-3 py-1 text-gray-600 hover:text-blue-600">3</button>
          <button className="px-3 py-1 text-gray-500 hover:text-blue-600">Next &gt;</button>
        </div>
      </main>
      
    </div>
  );
};

export default ProductListing;