import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import heroBanner from '../assets/hero-banner.jpg';
import apiClient from '../api/axiosConfig';

const Home = () => {
   // 1. Setup State for API Data
  const [highlightedProducts, setHighlightedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 2. Fetch data on component mount
  useEffect(() => {
  const fetchHighlights = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/products');
      setHighlightedProducts(response.data.slice(0, 4));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchHighlights();
}, []);

  const categories = [
    { id: 'c1', name: "Men's Fashion", apiName: "men's clothing", link: "/products?category=mens" },
    { id: 'c2', name: "Women's Fashion", apiName: "women's clothing", link: "/products?category=womens" },
    { id: 'c3', name: 'Jewelery', apiName: 'jewelery', link: '/products?category=jewelery' },
    { id: 'c4', name: 'Electronics', apiName: 'electronics', link: '/products?category=electronics' },
  ];

  return (
    <div className="bg-white">
      
      {/* 1. Hero Section */}
      <section 
  className="relative bg-gray-100 h-96 flex items-center justify-center text-center px-4"
  style={{ 
    backgroundImage: `url(${heroBanner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 drop-shadow-sm">
            Festive Finds, Every Time
          </h1>
          <Link 
            to="/products" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-md" >
            Shop Now!
          </Link>
        </div>
      </section>

      {/*2. Product Highlights */}
     <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pd-16">
        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-4 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Product Highlights</h2>
          <div className="flex space-x-6 text-sm">
            <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">New Arrivals</button>
            <button className="text-gray-500 hover:text-gray-900 pb-1">Best Sellers</button>
            <button className="text-gray-500 hover:text-gray-900 pb-1">Top Rated</button>
          </div>
        </div>
        {/* 2b. Render Loading, Error, or Data */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-medium py-10">
            Error loading highlights: {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlightedProducts.map(product => (
              <ProductCard 
                key={product._id} 
                product={{
                  id: product._id,
                  name: product.title,       
                  price: product.price,
                  image: product.image,
                  category: product.category,
                  rating: product.rating?.rate, 
                  reviewsCount: product.rating?.count
                }} 
              />
            ))}
          </div>
        )}
      </section>

      {/* 3. Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={category.link} className="group text-center">

              <div className="w-full aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden flex items-center justify-center p-4">
              </div>

              <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Deal of the Week Banner */}
      <section className="mb-16 mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 drop-shadow-md">Deal of the Week</h2>
        <p className="text-xl mb-8 text-blue-100">Get 20% off all sweaters this week only!</p>
        <button className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-md transition-colors"
        >
          View Deals
        </button>
      </section>

      {/* 5. Feature Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          
          <div className="flex flex-col items-center pt-8 md:pt-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <h3 className="text-gray-600 font-medium">Free Shipping</h3>
          </div>

          <div className="flex flex-col items-center pt-8 md:pt-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="text-gray-600 font-medium">24/7 Support</h3>
          </div>

          <div className="flex flex-col items-center pt-8 md:pt-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h3 className="text-gray-600 font-medium">Money-Back Guarantee</h3>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;