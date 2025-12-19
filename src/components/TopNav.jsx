import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TopNav = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="material-icons text-white text-lg">smartphone</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">RechargeMax</h1>
            <p className="text-xs text-gray-500 -mt-1">Quick & Secure</p>
          </div>
        </Link>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, operators, plans"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="material-icons text-lg">notifications</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">3</span>
          </button>

          {/* Wallet Balance */}
          <button 
            onClick={() => navigate('/wallet')}
            className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
          >
            <span className="material-icons text-sm">account_balance_wallet</span>
            <span className="font-semibold">₹1,250</span>
          </button>

          {/* Quick Add Money */}
          <button 
            onClick={() => navigate('/wallet')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="material-icons text-lg">add_circle</span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="material-icons text-white text-sm">person</span>
              </div>
              <span className="material-icons text-sm">keyboard_arrow_down</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <span className="material-icons text-sm">person</span>
                  Profile
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <span className="material-icons text-sm">settings</span>
                  Settings
                </Link>
                <hr className="my-2" />
                <button className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left">
                  <span className="material-icons text-sm">logout</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;