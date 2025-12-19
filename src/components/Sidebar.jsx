import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Smartphone,
  Tv,
  Zap,
  Droplets,
  Flame,
  Wifi,
  Car,
  Gift,
  Wallet,
  User,
  HelpCircle
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Smartphone, label: 'Mobile Recharge', path: '/recharge' },
    { icon: Tv, label: 'DTH Recharge', path: '/recharge' },
    { icon: Zap, label: 'Electricity Bill', path: '/recharge' },
    { icon: Droplets, label: 'Water Bill', path: '/recharge' },
    { icon: Flame, label: 'Gas Bill', path: '/recharge' },
    { icon: Wifi, label: 'Broadband', path: '/recharge' },
    { icon: Car, label: 'FASTag', path: '/recharge' },
    { icon: Gift, label: 'Offers', path: '/offers' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: HelpCircle, label: 'Support', path: '/support' },
  ];

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
