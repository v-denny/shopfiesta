import React from 'react';

const ShippingReturns = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero Header */}
      <div className="relative h-64 rounded-3xl overflow-hidden mb-16 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-teal-600 opacity-90"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Shipping & Returns</h1> 
          <p className="text-lg opacity-90">Your guide to seamless delivery and easy returns, rooted in care.</p> 
        </div>
      </div>

      
      {/* Order Journey Timeline Section */}
<section className="mb-20">
  <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
    <svg className="w-6 h-6 text-[rgb(100,106,232)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    Your Package's Journey
  </h2>

  <div className="relative">
    {/* Connecting Line (Desktop) */}
    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>

    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
      {[
        { label: 'Order Placed', desc: 'Confirmation email sent' },
        { label: 'Processing', desc: 'Preparing your festive finds' },
        { label: 'Shipped', desc: 'Package is with the carrier' },
        { label: 'Out for Delivery', desc: 'Arriving at your local hub' },
        { label: 'Delivered', desc: 'Enjoy your ShopFiesta!' }
      ].map((step, idx) => (
        <div key={idx} className="flex flex-col items-center group">
          {/* Status Circle */}
          <div className="w-10 h-10 rounded-full bg-white border-4 border-blue-50 flex items-center justify-center mb-4 group-hover:border-[rgb(100,106,232)] transition-all duration-300 shadow-sm">
            <div className="w-3 h-3 rounded-full bg-gray-300 group-hover:bg-[rgb(100,106,232)] transition-colors"></div>
          </div>
          
          {/* Label & Description */}
          <div className="text-center">
            <h3 className="font-bold text-gray-900 text-sm mb-1">{step.label}</h3>
            <p className="text-xs text-gray-500 leading-tight px-2">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Shipping Policy Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <svg className="w-6 h-6 text-[rgb(100,106,232)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
          Shipping Policy
        </h2> 
        <p className="text-gray-600 mb-8 leading-relaxed">
          At ShopFiesta, we are committed to getting your fiesta to you safely and efficiently. We carefully pack each item to ensure it arrives in perfect condition. 
        </p>

        <div className="overflow-hidden border border-gray-200 rounded-xl">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-bold">Method</th> 
                <th className="px-6 py-4 font-bold">Timeline</th> 
                <th className="px-6 py-4 font-bold">Cost</th> 
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-600">
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">Standard Shipping</td> 
                <td className="px-6 py-4">3-5 Business Days</td> 
                <td className="px-6 py-4">$5.00</td> 
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">Express Shipping</td> 
                <td className="px-6 py-4">1-2 Business Days</td> 
                <td className="px-6 py-4">$15.00</td> 
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">International Shipping</td> 
                <td className="px-6 py-4">7-14 Business Days</td> 
                <td className="px-6 py-4">$25.00</td> 
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Returns Process Section */}
      <section>
        <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
          <svg className="w-6 h-6 text-[rgb(100,106,232)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" /></svg>
          How to Start a Return
        </h2> 

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: 'Step 1', text: 'Submit a return request online through your account dashboard.', icon: '1' }, 
            { step: 'Step 2', text: 'Carefully package the items in their original condition.', icon: '2' }, 
            { step: 'Step 3', text: 'Ship the package back using a trackable shipping method.', icon: '3' }, 
            { step: 'Step 4', text: 'Receive confirmation and your refund within 5-7 business days.', icon: '35, 36' } 
          ].map((item, idx) => (
            <div key={idx} className="relative group text-center">
              <div className="w-12 h-12 bg-blue-50 text-[rgb(100,106,232)] rounded-full flex items-center justify-center mx-auto mb-4 font-bold group-hover:bg-[rgb(100,106,232)] group-hover:text-white transition-all">
                {idx + 1}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.step}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShippingReturns;