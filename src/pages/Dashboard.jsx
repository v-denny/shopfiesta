import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  // Grab the user from Redux if they are logged in
  const { user } = useSelector((state) => state.auth);
  
  // Fallback to the design's mock name if no user is in state yet
  const userName = user?.name || 'Alex Johnson';

  // Mock Data based on the UI Design
  const recentOrders = [
    { id: 'SG1001', date: '2023-10-26', status: 'Delivered', total: 55.00 },
    { id: 'SG1002', date: '2023-11-15', status: 'Shipped', total: 120.50 },
    { id: 'SG1003', date: '2023-11-28', status: 'Processing', total: 30.00 },
    { id: 'SG1004', date: '2023-12-05', status: 'Delivered', total: 45.00 },
    { id: 'SG1005', date: '2023-12-18', status: 'Processing', total: 220.00 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}!</h1>
        <p className="text-gray-600 mt-2">Enjoy your ShopFiesta with us!</p>
      </div>

      {/* Main Dashboard Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar Navigation (Desktop) */}
        <aside className="w-full lg:w-1/4 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <nav className="flex flex-col">
              <Link to="/dashboard" className="px-6 py-4 bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600">
                Dashboard Home
              </Link>
              <Link to="#" className="px-6 py-4 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors border-l-4 border-transparent">
                My Orders
              </Link>
              <Link to="/wishlist" className="px-6 py-4 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors border-l-4 border-transparent flex justify-between items-center">
                Wishlist
                <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs font-bold">12</span>
              </Link>
              <Link to="#" className="px-6 py-4 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors border-l-4 border-transparent">
                Addresses
              </Link>
              <Link to="#" className="px-6 py-4 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors border-l-4 border-transparent">
                Payment Methods
              </Link>
              <Link to="#" className="px-6 py-4 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors border-l-4 border-transparent">
                Account Settings
              </Link>
            </nav>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="w-full lg:w-3/4 space-y-8">
          
          {/* Top Row: Account & Loyalty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Account Info Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Account Information</h2>
                <button className="text-[rgb(100,106,232)] text-sm font-medium hover:underline">Edit Profile</button>
              </div>
              <div className="space-y-3 text-gray-600">
                <div>
                  <span className="block text-sm text-gray-400">Name</span>
                  <span className="font-medium text-gray-900">{userName}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-400">Email Address</span>
                  <span>{user?.email || 'shopfiesta@example.com'}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-400">Phone Number</span>
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>

            {/* Loyalty & Rewards Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center bg-gradient-to-br from-orange-50 to-white">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Loyalty & Rewards</h2>
              <div className="text-4xl font-black text-orange-500 mb-1">750</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Your Points</div>
              
              <div className="bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-bold mb-4">
                Status: Bronze Tier
              </div>
              
              <div className="text-sm text-gray-600 text-left w-full pl-4">
                <span className="font-bold text-gray-800 block mb-1">Benefits:</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li>5% off all orders</li>
                  <li>Early access to sales</li>
                  <li>Birthday discount</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Middle Row: Addresses & Payments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Default Shipping */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Default Shipping</h2>
                <button className="text-[rgb(100,106,232)] text-sm font-medium hover:underline">Manage</button>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed">
                <p className="font-medium text-gray-900">Alex Johnson</p>
                <p>123 Main St.</p>
                <p>Garden City, CA 90210</p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Payment Methods</h2>
                <button className="text-[rgb(100,106,232)] text-sm font-medium hover:underline">Manage</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-blue-100 text-blue-800 rounded flex items-center justify-center font-bold text-xs">VISA</div>
                    <span className="text-gray-600">Ending in 1234</span>
                  </div>
                  <span className="text-gray-400">Expires 10/25</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-red-100 text-red-800 rounded flex items-center justify-center font-bold text-xs">MC</div>
                    <span className="text-gray-600">Ending in 5678</span>
                  </div>
                  <span className="text-gray-400">Expires 08/27</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Recent Orders Table */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <button className="text-[rgb(100,106,232)] text-sm font-medium hover:underline">View All (8)</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
                    <th className="pb-3 font-medium">Order</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <td className="py-4 font-medium text-gray-900">{order.id}</td>
                      <td className="py-4">{order.date}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 font-medium">${order.total.toFixed(2)}</td>
                      <td className="py-4 text-right">
                        <button className="text-[rgb(100,106,232)] hover:underline font-medium">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;