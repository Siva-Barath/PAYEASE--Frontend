const Header = ({ onNavigate }) => {
  // Check if we're on the plans page to apply seamless styling
  const isPlansPage = window.location.pathname.includes('/plans');
  
  if (isPlansPage) {
    return (
      <header className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-3 relative z-50" style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
        <div className="flex items-center justify-between">
          {/* App Name & Navigation */}
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-slate-800">RechargeMax</h1>
            <nav className="flex items-center gap-6">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => onNavigate('plans')}
                className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                Plans
              </button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">search</span>
              <input
                type="text"
                placeholder="Search services, operators, plans"
                className="w-full pl-10 pr-4 py-2 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-slate-700 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:text-slate-800 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="material-icons">notifications</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>

            {/* Wallet Balance */}
            <div className="bg-gradient-to-r from-gray-100 to-slate-100 text-slate-700 px-3 py-2 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <span className="material-icons text-sm">account_balance_wallet</span>
                <span className="font-semibold">₹1,250</span>
              </div>
            </div>

            {/* Profile */}
            <button 
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2 p-2 text-slate-600 hover:text-slate-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full flex items-center justify-center">
                <span className="material-icons text-white text-sm">person</span>
              </div>
              <span className="material-icons text-sm">keyboard_arrow_down</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Default header for other pages
  return (
    <header className="px-6 py-4 bg-gradient-to-r from-blue-50 to-teal-50 backdrop-blur-sm" style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
      <div className="flex items-center justify-between">
        {/* App Name & Navigation */}
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-slate-800">RechargeMax</h1>
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="font-medium transition-colors text-slate-600 hover:text-slate-800"
            >
              Dashboard
            </button>
            <button 
              onClick={() => onNavigate('plans')}
              className="font-medium transition-colors text-slate-600 hover:text-slate-800"
            >
              Plans
            </button>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">search</span>
            <input
              type="text"
              placeholder="Search services, operators, plans"
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white/80 border border-blue-200 text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
              onFocus={(e) => { e.target.style.borderColor = '#22c55e'; e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.2)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(34, 197, 94, 0.3)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg transition-colors" style={{ color: '#15803d' }} onMouseEnter={(e) => { e.target.style.color = '#22c55e'; e.target.style.backgroundColor = 'rgba(34, 197, 94, 0.1)'; }} onMouseLeave={(e) => { e.target.style.color = '#15803d'; e.target.style.backgroundColor = 'transparent'; }}>
            <span className="material-icons">notifications</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>

          {/* Wallet Balance */}
          <div className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-100 to-teal-100 text-slate-700 border border-blue-200">
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">account_balance_wallet</span>
              <span className="font-semibold">₹1,250</span>
            </div>
          </div>

          {/* Profile */}
          <button 
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 p-2 rounded-lg transition-colors"
            style={{ color: '#e2e8f0' }}
            onMouseEnter={(e) => { e.target.style.color = '#22c55e'; e.target.style.backgroundColor = 'rgba(34, 197, 94, 0.1)'; }}
            onMouseLeave={(e) => { e.target.style.color = '#15803d'; e.target.style.backgroundColor = 'transparent'; }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="material-icons text-white text-sm">person</span>
            </div>
            <span className="material-icons text-sm">keyboard_arrow_down</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;