import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalQuantity } = useSelector((state) => state.cart);
  
  // 1. Manage current step: 1 (Info), 2 (Shipping), 3 (Payment)
  const [step, setStep] = useState(1);

  // 2. Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
    shippingMethod: 'standard'
  });

  // Calculations [cite: 348, 351, 352]
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.07; 
  const shippingCost = formData.shippingMethod === 'express' ? 15.00 : 8.00;
  const total = subtotal + tax + shippingCost;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const renderStepIndicator = () => (
    <nav className="flex items-center justify-center space-x-4 mb-12 text-sm font-medium">
      <span className={step >= 1 ? "text-[rgb(100,106,232)]" : "text-gray-400"}>Information</span>
      <span className="text-gray-300">/</span>
      <span className={step >= 2 ? "text-[rgb(100,106,232)]" : "text-gray-400"}>Shipping</span>
      <span className="text-gray-300">/</span>
      <span className={step >= 3 ? "text-[rgb(100,106,232)]" : "text-gray-400"}>Payment</span>
    </nav>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-16">
      
      {/* Left Side: Form Steps [cite: 310, 328, 329] */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        {renderStepIndicator()}

        <form className="space-y-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <input 
                type="email" placeholder="Email" 
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[rgb(100,106,232)] outline-none"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              
              <h2 className="text-xl font-semibold pt-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First name" className="p-3 border border-gray-300 rounded-md" />
                <input type="text" placeholder="Last name" className="p-3 border border-gray-300 rounded-md" />
              </div>
              <input type="text" placeholder="Address" className="w-full p-3 border border-gray-300 rounded-md" />
              <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full p-3 border border-gray-300 rounded-md" />
              <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="City" className="p-3 border border-gray-300 rounded-md" />
                <input type="text" placeholder="Country" className="p-3 border border-gray-300 rounded-md" />
                <input type="text" placeholder="Postal code" className="p-3 border border-gray-300 rounded-md" />
              </div>
              <button 
                type="button" onClick={handleNext}
                className="w-full bg-[rgb(100,106,232)] text-white py-4 rounded-md font-bold hover:opacity-90 transition-all"
              >
                Continue to shipping
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Shipping Method</h2>
              <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
                <label className="flex items-center justify-between p-4 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" checked={formData.shippingMethod === 'standard'} onChange={() => setFormData({...formData, shippingMethod: 'standard'})} />
                    <span>Standard Shipping (5-7 days)</span>
                  </div>
                  <span className="font-bold">$8.00</span>
                </label>
                <label className="flex items-center justify-between p-4 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" checked={formData.shippingMethod === 'express'} onChange={() => setFormData({...formData, shippingMethod: 'express'})} />
                    <span>Express Shipping (2-3 days)</span>
                  </div>
                  <span className="font-bold">$15.00</span>
                </label>
              </div>
              <div className="flex justify-between items-center pt-6">
                <button type="button" onClick={handleBack} className="text-[rgb(100,106,232)] font-medium underline">Back to info</button>
                <button type="button" onClick={handleNext} className="bg-[rgb(100,106,232)] text-white px-10 py-4 rounded-md font-bold hover:opacity-90 transition-all">Continue to payment</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Payment</h2>
              <p className="text-gray-500 text-sm">All transactions are secure and encrypted. [cite: 353]</p>
              <div className="bg-gray-50 p-6 border border-gray-200 rounded-md space-y-4">
                <input type="text" placeholder="Card number" className="w-full p-3 border border-gray-300 rounded-md" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Expiration date (MM/YY)" className="p-3 border border-gray-300 rounded-md" />
                  <input type="text" placeholder="Security code" className="p-3 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="flex justify-between items-center pt-6">
                <button type="button" onClick={handleBack} className="text-[rgb(100,106,232)] font-medium underline">Back to shipping</button>
                <button 
                  type="button" onClick={() => navigate('/dashboard')}
                  className="bg-[rgb(100,106,232)] text-white px-10 py-4 rounded-md font-bold hover:opacity-90 transition-all"
                >
                  Complete Order
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Right Side: Order Summary Preview [cite: 311, 352] */}
      <div className="w-full lg:w-96 bg-gray-50 p-8 rounded-xl border border-gray-200 h-fit">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
        <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.name} x {item.quantity}</span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2 text-sm text-gray-600 mb-6">
          <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Taxes</span><span>${tax.toFixed(2)}</span></div>
        </div>
        <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-6">
          <span>Total</span>
          <span className="text-[rgb(100,106,232)]">${total.toFixed(2)}</span>
        </div>
      </div>

    </div>
  );
};

export default Checkout;