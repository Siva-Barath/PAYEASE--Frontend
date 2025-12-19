import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import payeaseLogo from '../assets/PAYEASE.png';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Plans', path: '/plans' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <nav className="bg-gray-600 shadow-md border-b border-gray-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={payeaseLogo} alt="PAYEASE" className="w-12 h-12 object-contain" />
            <span className="text-2xl font-bold text-white tracking-tight">PAYEASE</span>
          </Link>

          {/* Right Side - Navigation + Profile */}
          <div className="flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors relative ${
                    location.pathname === item.path
                      ? 'text-blue-400 after:absolute after:bottom-[-16px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-400'
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Profile Icon */}
            {user ? (
              <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <span className="material-icons text-white text-lg">person</span>
                </button>
                
                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute top-12 right-0 bg-white rounded-xl shadow-2xl border-0 py-3 w-56 z-50" style={{
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}>
                    {/* User Header */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <div className="font-bold text-gray-900 text-sm">{user?.name || 'User'}</div>
                      <div className="text-xs text-gray-500 mt-1">{user?.phone ? `+91 ${user.phone}` : 'Welcome back'}</div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-2">
                      <Link 
                        to="/profile" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer relative"
                        onClick={() => setShowDropdown(false)}
                        onMouseEnter={(e) => {
                          e.target.style.paddingLeft = '18px';
                          e.target.querySelector('.accent-bar').style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.paddingLeft = '16px';
                          e.target.querySelector('.accent-bar').style.opacity = '0';
                        }}
                      >
                        <div className="accent-bar absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 opacity-0 transition-opacity duration-200"></div>
                        <span className="material-icons text-gray-400 mr-3" style={{ fontSize: '20px', lineHeight: '1' }}>person</span>
                        <span className="font-medium" style={{ lineHeight: '20px' }}>Profile</span>
                      </Link>
                      <Link 
                        to="/dashboard" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer relative"
                        onClick={() => setShowDropdown(false)}
                        onMouseEnter={(e) => {
                          e.target.style.paddingLeft = '18px';
                          e.target.querySelector('.accent-bar').style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.paddingLeft = '16px';
                          e.target.querySelector('.accent-bar').style.opacity = '0';
                        }}
                      >
                        <div className="accent-bar absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 opacity-0 transition-opacity duration-200"></div>
                        <span className="material-icons text-gray-400 mr-3" style={{ fontSize: '20px', lineHeight: '1' }}>dashboard</span>
                        <span className="font-medium" style={{ lineHeight: '20px' }}>Dashboard</span>
                      </Link>
                    </div>
                    
                    {/* Logout Section */}
                    <div className="border-t border-gray-100 pt-2">
                      <button 
                        onClick={() => {
                          logout();
                          setShowDropdown(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-red-700 hover:bg-red-50 transition-all duration-200 cursor-pointer relative"
                        onMouseEnter={(e) => {
                          e.target.style.paddingLeft = '18px';
                          e.target.querySelector('.accent-bar').style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.paddingLeft = '16px';
                          e.target.querySelector('.accent-bar').style.opacity = '0';
                        }}
                      >
                        <div className="accent-bar absolute left-0 top-0 bottom-0 w-0.5 bg-red-500 opacity-0 transition-opacity duration-200"></div>
                        <span className="material-icons text-red-500 mr-3" style={{ fontSize: '20px', lineHeight: '1' }}>logout</span>
                        <span className="font-semibold" style={{ lineHeight: '20px' }}>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="border border-blue-400 text-blue-400 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;