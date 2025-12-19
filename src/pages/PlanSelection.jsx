import { useState } from 'react';
import { useApp } from '../context/AppContext';

const PlanSelection = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const { setSelectedPlan } = useApp();

  const categories = [
    { id: 'popular', label: 'Popular', icon: 'star' },
    { id: 'unlimited', label: 'Unlimited', icon: 'all_inclusive' },
    { id: 'data', label: 'Data', icon: 'data_usage' },
    { id: 'talktime', label: 'Talktime', icon: 'call' },
    { id: 'combo', label: 'Combo', icon: 'apps' },
    { id: 'validity', label: 'Validity', icon: 'schedule' },
  ];

  const plans = {
    popular: [
      { price: '₹299', validity: '28 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Disney+ Hotstar Mobile'], popular: true },
      { price: '₹199', validity: '28 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Airtel Thanks'] },
      { price: '₹449', validity: '56 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Amazon Prime'] },
    ],
    unlimited: [
      { price: '₹599', validity: '84 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Netflix + Hotstar'] },
      { price: '₹719', validity: '84 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Prime + Netflix'] },
    ],
    data: [
      { price: '₹19', validity: '1 day', data: '1GB', benefits: ['Full speed data', 'No calls'] },
      { price: '₹48', validity: '3 days', data: '3GB', benefits: ['Full speed data', 'No calls'] },
    ],
    talktime: [
      { price: '₹10', validity: '7 days', data: 'No data', benefits: ['₹7.47 talktime', 'Local/STD calls'] },
      { price: '₹20', validity: '18 days', data: 'No data', benefits: ['₹14.95 talktime', 'Local/STD calls'] },
    ],
    combo: [
      { price: '₹401', validity: '28 days', data: '3GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Hotstar + Prime'] },
    ],
    validity: [
      { price: '₹2999', validity: '365 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'All OTT apps'] },
    ],
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    onNavigate('payment');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Select Recharge Plan</h1>
          <p className="text-gray-600 mt-1">Choose the best plan for your needs</p>
        </div>
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span className="material-icons">arrow_back</span>
          Back to Dashboard
        </button>
      </div>

      {/* Mobile Info */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="material-icons text-blue-600">smartphone</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">+91 98765 43210</h3>
            <p className="text-sm text-gray-500">Airtel • Delhi Circle</p>
          </div>
          <div className="ml-auto">
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <span className="material-icons text-sm">check_circle</span>
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
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

      {/* Plans Grid */}
      <div className="grid gap-4">
        {plans[selectedCategory]?.map((plan, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
              plan.popular ? 'border-orange-400 relative' : 'border-gray-200 hover:border-blue-400'
            }`}
            onClick={() => handlePlanSelect(plan)}
          >
            {plan.popular && (
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                🔥 MOST POPULAR
              </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-3xl font-bold text-gray-800">{plan.price}</div>
                <div className="text-sm text-gray-500">{plan.validity}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-600">{plan.data}</div>
                <div className="text-xs text-gray-500">High Speed</div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <ul className="space-y-2">
                {plan.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Recharge Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanSelection;