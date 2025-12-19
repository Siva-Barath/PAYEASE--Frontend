import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const PlanPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { setSelectedPlan } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const qs = new URLSearchParams(search);
  const number = qs.get('number');
  const operator = qs.get('operator');

  const categories = [
    { id: 'popular', label: 'Popular' },
    { id: 'unlimited', label: 'Unlimited' },
    { id: 'data', label: 'Data' },
    { id: 'talktime', label: 'Talktime' },
    { id: 'combo', label: 'Combo' },
    { id: 'validity', label: 'Validity' }
  ];

  const mockPlans = {
    popular: [
      { 
        id: 1, 
        price: '₹299', 
        validity: '28 days', 
        data: '2GB/day', 
        benefits: ['Unlimited calls', '100 SMS/day', 'Disney+ Hotstar Mobile'], 
        popular: true,
        badge: 'Best Seller'
      },
      { 
        id: 2, 
        price: '₹199', 
        validity: '28 days', 
        data: '1.5GB/day', 
        benefits: ['Unlimited calls', '100 SMS/day', 'Airtel Thanks'],
        badge: 'Recommended'
      },
      { 
        id: 3, 
        price: '₹449', 
        validity: '56 days', 
        data: '2GB/day', 
        benefits: ['Unlimited calls', '100 SMS/day', 'Amazon Prime'] 
      },
    ],
    unlimited: [
      { 
        id: 4, 
        price: '₹599', 
        validity: '84 days', 
        data: '2GB/day', 
        benefits: ['Unlimited calls', '100 SMS/day', 'Netflix + Hotstar'] 
      },
      { 
        id: 5, 
        price: '₹719', 
        validity: '84 days', 
        data: '1.5GB/day', 
        benefits: ['Unlimited calls', '100 SMS/day', 'Prime + Netflix'] 
      },
    ],
    data: [
      {
        id: 6,
        price: '₹19',
        validity: '1 day',
        data: '1GB',
        benefits: ['Full speed data', 'No calls']
      },
      {
        id: 7,
        price: '₹48',
        validity: '3 days',
        data: '3GB',
        benefits: ['Full speed data', 'No calls']
      },
    ],
    talktime: [
      {
        id: 10,
        price: '₹99',
        validity: '28 days',
        data: '100MB',
        benefits: ['₹100 talktime']
      },
      {
        id: 11,
        price: '₹199',
        validity: '56 days',
        data: '200MB',
        benefits: ['₹200 talktime']
      },
    ],
    combo: [
      { 
        id: 8, 
        price: '₹401', 
        validity: '28 days', 
        data: '3GB/day', 
        benefits: ['Unlimited calls', '100 SMS/day', 'Hotstar + Prime'] 
      },
    ],
    validity: [
      { 
        id: 9, 
        price: '₹2999', 
        validity: '365 days', 
        data: '2GB/day', 
        benefits: ['Unlimited calls', '100 SMS/day', 'All OTT apps'] 
      },
    ],
  };

  const operatorInfo = {
    jio: { name: 'Jio', logo: '🔵' },
    airtel: { name: 'Airtel', logo: '🔴' },
    vi: { name: 'Vi', logo: '🟣' },
    bsnl: { name: 'BSNL', logo: '🟠' }
  };

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    const timer = setTimeout(() => {
      setPlans(mockPlans[selectedCategory] || []);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan({ ...plan, number, operator });
    navigate('/recharge/payment');
  };

  if (!number || !operator) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Request</h1>
        <p className="text-gray-600 mb-6">Please provide a valid mobile number and operator.</p>
        <Link to="/recharge" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
          Go to Recharge
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/recharge" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
          <span className="material-icons">arrow_back</span>
          Back
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-3xl">{operatorInfo[operator]?.logo}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Plans for +91 {number.slice(0, 5)}...
            </h1>
            <p className="text-gray-600">{operatorInfo[operator]?.name} • Delhi Circle</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-16 bg-gray-50 -mx-8 px-8 py-4 mb-8 border-b border-gray-200">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="material-icons text-sm">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-12">
          <span className="material-icons text-6xl text-gray-300 mb-4">search_off</span>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No plans available</h3>
          <p className="text-gray-500 mb-6">Try selecting a different category or operator</p>
          <Link to="/recharge" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
            Try Another Operator
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-gray-800 mb-1">{plan.price.replace('₹', '')}</div>
                <div className="text-lg text-gray-600">{plan.validity}</div>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-semibold">{plan.data}</span>
                </div>
                {plan.benefits.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Benefits:</span>
                    <span className="font-semibold text-sm">{plan.benefits.join(', ')}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => handlePlanSelect(plan)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Recharge Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanPage;