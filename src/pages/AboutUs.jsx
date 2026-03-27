import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white">
      {/* 1. Hero Section: Brand Vision */}
      <section className="relative py-20 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Our Story: Bringing the Fiesta to You
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ShopFiesta brings the joy of celebrations to your shopping experience. 
            We believe every package delivered should feel like a celebration, 
            rooted in care and seamless service. 
          </p>
        </div>
      </section>

      {/* 2. Our Values Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Sustainability */}
          <div className="text-center p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Eco-Friendly Rooted</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We are dedicated to sustainability. All our packaging materials are recycled, recyclable, 
              or biodegradable, minimizing our environmental footprint. 
            </p>
          </div>

          {/* Quality Care */}
          <div className="text-center p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 text-[rgb(100,106,232)] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Packed with Care</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We carefully pack each item to ensure it arrives in perfect condition, 
              avoiding any potential damage before it reaches you. 
            </p>
          </div>

          {/* Customer Satisfaction */}
          <div className="text-center p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.757c1.246 0 2.441.494 3.321 1.374s1.374 2.075 1.374 3.321V20a2 2 0 01-2 2H4a2 2 0 01-2-2v-5.305c0-1.246.494-2.441 1.374-3.321S5.449 10 6.695 10H10V3a1 1 0 011-1h2a1 1 0 011 1v7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Priority</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your satisfaction is our priority. If for any reason you are not entirely happy, 
              we offer easy returns within 30 days. 
            </p>
          </div>
        </div>
      </section>

      {/* 3. Community & Education Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <div className="aspect-video bg-gray-200 rounded-2xl shadow-inner flex items-center justify-center text-gray-400">
                
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">More Than Just a Store</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We go beyond products. We provide expert tips, seasonal spotlights, and inspiring 
                DIY projects to help you cultivate joy in your daily life. 
              </p>
              <Link 
                to="/signup" 
                className="inline-flex items-center gap-2 text-[rgb(100,106,232)] font-bold hover:underline"
              >
                Join our newsletter community 
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact CTA */}
      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Ready to get your party going?</h2>
        <Link 
          to="/products" 
          className="bg-[rgb(100,106,232)] hover:opacity-90 text-white font-bold px-12 py-4 rounded-md transition-all shadow-lg"
        >
          Start Shopping
        </Link>
      </section>
    </div>
  );
};

export default About;