import React, { useState } from 'react';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thank you! Your message has been sent.');
  };

  const faqCategories = [
    {
      title: "Orders & Payments", 
      questions: [
        "How do I place an order?", 
        "What payment methods do you accept?", 
        "Can I change or cancel my order after it's placed?",
        "How do I track my order?", 
        "Is my payment information secure?" 
      ]
    },
    {
      title: "Shipping & Delivery", 
      questions: [
        "What are your shipping options and costs?", 
        "Do you ship internationally?", 
        "How long does shipping take?", 
        "What if my products arrive damaged?",
        "Can I ship to multiple addresses?" 
      ]
    }
  ];

  return (
       
<div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Let's Grow Together!</h1> 
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have a question about your cart, our products, or an order? We're here at your service 24x7. 
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Store Details */}
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Store Details</h2> 
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-[rgb(100,106,232)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email Us</p>
                  <p className="text-gray-600">support@shopfiesta.com</p> 
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-[rgb(100,106,232)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Call Us</p>
                  <p className="text-gray-600">(123) 456-7890</p> 
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-[rgb(100,106,232)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Visit Us</p>
                  <p className="text-gray-600">123 Bloom Lane, Garden City, GA 30303</p> 
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h3> 
            <div className="flex gap-4">
              {/* Add social icons here as per the footer style */}
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Us</h2> 
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label> 
                <input 
                  type="text" placeholder="Enter your name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[rgb(100,106,232)] focus:border-transparent outline-none transition-all"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label> 
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[rgb(100,106,232)] focus:border-transparent outline-none transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
              <select 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[rgb(100,106,232)] focus:border-transparent outline-none transition-all bg-white"
                onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
              >
                <option value="">Select inquiry type</option> 
                <option value="order">Order Status</option>
                <option value="return">Returns & Exchanges</option>
                <option value="product">Product Information</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label> 
              <input 
                type="text" 
                placeholder="Enter subject" 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[rgb(100,106,232)] focus:border-transparent outline-none transition-all"
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows="4" 
                placeholder="Enter your message" 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[rgb(100,106,232)] focus:border-transparent outline-none transition-all resize-none"
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-[rgb(100,106,232)] hover:opacity-90 text-white font-bold py-4 rounded-lg transition-all shadow-lg"
            >
              Send Message 
            </button>
          </form>
        </div>
      </div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
  <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1> 
        <p className="text-gray-600">Find quick solutions to your shopping queries.</p> 
  </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {faqCategories.map((cat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[rgb(100,106,232)] mb-6 border-b border-gray-50 pb-4">
              {cat.title}
            </h2>
            <div className="space-y-4">
              {cat.questions.map((q, qIdx) => (
                <details key={qIdx} className="group cursor-pointer">
                  <summary className="flex justify-between items-center font-medium text-gray-700 hover:text-blue-600 transition-colors list-none">
                    {q}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm text-gray-500 leading-relaxed pl-2 border-l-2 border-blue-50">
                    We strive to provide the best festive experience. Please contact support for specific details regarding this query.
                  </p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
  </div>
   
</div>

  );
};

export default Support;