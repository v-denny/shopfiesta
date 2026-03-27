import React from 'react';

const FAQ = () => {
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
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1> 
        <p className="text-gray-600">Find quick solutions to your shopping queries. Search below or explore categories.</p> 
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

      {/* Help CTA */}
      <div className="mt-20 text-center bg-[rgb(100,106,232)] rounded-3xl p-12 text-white">
        <h2 className="text-2xl font-bold mb-4">Need More Specific Assistance?</h2> 
        <p className="mb-8 opacity-90">Our support team is ready to help with any questions not covered in our FAQ.</p> 
        <button className="bg-white text-[rgb(100,106,232)] px-10 py-3 rounded-md font-bold hover:bg-gray-50 transition-colors shadow-lg">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQ;