import { useState } from 'react';
import { Link } from 'react-router-dom';
import jioLogo from '../assets/jio.png';
import airtelLogo from '../assets/airtel.png';
import viLogo from '../assets/vi.webp';
import bsnlLogo from '../assets/bsnl-logo.jpg';

const Plans = () => {
  const [selectedOperator, setSelectedOperator] = useState('jio');
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showAllPlans, setShowAllPlans] = useState(false);

  const operators = [
    { id: 'jio', name: 'Jio', logo: jioLogo, color: 'bg-blue-600' },
    { id: 'airtel', name: 'Airtel', logo: airtelLogo, color: 'bg-red-600' },
    { id: 'vi', name: 'Vi', logo: viLogo, color: 'bg-purple-600' },
    { id: 'bsnl', name: 'BSNL', logo: bsnlLogo, color: 'bg-orange-600' }
  ];

  const categories = [
    { id: 'popular', name: 'Popular' },
    { id: 'unlimited', name: 'Truly Unlimited' },
    { id: 'data', name: 'Data Add-On' },
    { id: 'validity', name: 'Validity' },
    { id: 'annual', name: 'Annual' },
    { id: 'ott', name: 'OTT Plans' },
    { id: 'talktime', name: 'Talktime' }
  ];

  const allPlans = {
    jio: {
      popular: [
        { id: 'j1', price: 149, validity: 20, data: '1GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j2', price: 179, validity: 24, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j3', price: 199, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j4', price: 239, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j5', price: 249, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j6', price: 299, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j7', price: 319, validity: 30, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j8', price: 349, validity: 30, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j9', price: 399, validity: 28, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j10', price: 449, validity: 28, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j11', price: 479, validity: 56, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j12', price: 533, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j13', price: 666, validity: 84, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j14', price: 719, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j15', price: 799, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j16', price: 999, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema', 'JioTV'] }
      ],
      unlimited: [
        { id: 'j10', price: 666, validity: 84, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j11', price: 719, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'j12', price: 999, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema', 'JioTV'] },
        { id: 'j13', price: 1559, validity: 336, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      data: [
        { id: 'j20', price: 19, validity: 1, data: '1GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'j21', price: 29, validity: 1, data: '2GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'j22', price: 58, validity: 28, data: '3GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'j23', price: 98, validity: 28, data: '12GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'j24', price: 148, validity: 28, data: '20GB', calls: 'No', sms: 'No', ott: [] }
      ],
      annual: [
        { id: 'j25', price: 2999, validity: 365, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['All bundled apps'] },
        { id: 'j26', price: 3599, validity: 365, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['All bundled apps'] }
      ],
      ott: [
        { id: 'j21', price: 299, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j22', price: 666, validity: 84, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema'] },
        { id: 'j23', price: 999, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['JioCinema', 'JioTV'] }
      ]
    },
    airtel: {
      popular: [
        { id: 'a1', price: 155, validity: 24, data: '1GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'a2', price: 179, validity: 28, data: '1GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a3', price: 239, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a4', price: 299, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a5', price: 349, validity: 28, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'a6', price: 399, validity: 28, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a7', price: 449, validity: 28, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'a8', price: 499, validity: 56, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'a9', price: 549, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a10', price: 719, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'a11', price: 839, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a12', price: 999, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Amazon Prime'] }
      ],
      unlimited: [
        { id: 'a13', price: 549, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a14', price: 719, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'a15', price: 999, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Amazon Prime'] },
        { id: 'a16', price: 1799, validity: 365, data: '24GB total', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      data: [
        { id: 'a17', price: 19, validity: 1, data: '1GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'a18', price: 65, validity: 28, data: '4GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'a19', price: 118, validity: 28, data: '12GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'a20', price: 181, validity: 28, data: '25GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'a21', price: 265, validity: 28, data: '50GB', calls: 'No', sms: 'No', ott: [] }
      ],
      annual: [
        { id: 'a22', price: 2999, validity: 365, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Airtel Thanks'] },
        { id: 'a23', price: 3359, validity: 365, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Amazon Prime'] },
        { id: 'a24', price: 3999, validity: 365, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Amazon Prime', 'Wynk'] }
      ],
      ott: [
        { id: 'a25', price: 299, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a26', price: 549, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Wynk'] },
        { id: 'a27', price: 999, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Amazon Prime'] }
      ]
    },
    vi: {
      popular: [
        { id: 'v1', price: 157, validity: 28, data: '1GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v2', price: 199, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v3', price: 239, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Vi Movies & TV'] },
        { id: 'v4', price: 299, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v5', price: 359, validity: 28, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v6', price: 409, validity: 28, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v7', price: 479, validity: 56, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v8', price: 539, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v9', price: 719, validity: 84, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v10', price: 859, validity: 84, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v11', price: 901, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      unlimited: [
        { id: 'v12', price: 539, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v13', price: 719, validity: 84, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v14', price: 901, validity: 84, data: '3GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      data: [
        { id: 'v15', price: 19, validity: 1, data: '1GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'v16', price: 58, validity: 28, data: '4GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'v17', price: 118, validity: 28, data: '12GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'v18', price: 178, validity: 28, data: '24GB', calls: 'No', sms: 'No', ott: [] }
      ],
      annual: [
        { id: 'v19', price: 2899, validity: 365, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'v20', price: 3099, validity: 365, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Weekend rollover'] },
        { id: 'v21', price: 3499, validity: 365, data: '2.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Vi Movies & TV'] }
      ],
      ott: [
        { id: 'v22', price: 239, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Vi Movies & TV'] },
        { id: 'v23', price: 399, validity: 56, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: ['Vi Movies & TV'] }
      ]
    },
    bsnl: {
      popular: [
        { id: 'b1', price: 97, validity: 28, data: '2GB total', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b2', price: 107, validity: 35, data: '3GB total', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b3', price: 153, validity: 24, data: '1GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b4', price: 187, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b5', price: 247, validity: 45, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b6', price: 298, validity: 54, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b7', price: 397, validity: 150, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b8', price: 499, validity: 90, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b9', price: 797, validity: 300, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      unlimited: [
        { id: 'b10', price: 187, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b11', price: 298, validity: 54, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b12', price: 397, validity: 150, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b13', price: 797, validity: 300, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      data: [
        { id: 'b14', price: 18, validity: 1, data: '1GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'b15', price: 56, validity: 28, data: '3GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'b16', price: 84, validity: 28, data: '6GB', calls: 'No', sms: 'No', ott: [] },
        { id: 'b17', price: 126, validity: 28, data: '12GB', calls: 'No', sms: 'No', ott: [] }
      ],
      annual: [
        { id: 'b18', price: 1999, validity: 365, data: '1GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b19', price: 2399, validity: 365, data: '1.5GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] },
        { id: 'b20', price: 2799, validity: 365, data: '2GB/day', calls: 'Unlimited', sms: '100 SMS/day', ott: [] }
      ],
      talktime: [
        { id: 'b21', price: 22, validity: 18, data: 'No', calls: '₹22 Talktime', sms: 'No', ott: [] },
        { id: 'b22', price: 47, validity: 90, data: 'No', calls: '₹39 Talktime', sms: 'No', ott: [] },
        { id: 'b23', price: 106, validity: 90, data: 'No', calls: '₹81 Talktime', sms: 'No', ott: [] }
      ]
    }
  };

  const getCurrentPlans = () => {
    return allPlans[selectedOperator]?.[selectedCategory] || [];
  };

  const getRecommendedPlans = () => {
    const plans = getCurrentPlans();
    if (plans.length === 0) return [];
    
    // Get 3 recommended plans with different characteristics
    const recommended = [];
    
    // Most popular (usually mid-range)
    const popular = plans.find(p => p.price >= 250 && p.price <= 350) || plans[0];
    if (popular) recommended.push({ ...popular, badge: 'Recommended', badgeColor: '#10B981' });
    
    // Best value (highest data/price ratio)
    const bestValue = plans.find(p => p.price >= 600 && p.validity >= 80) || plans[1];
    if (bestValue && bestValue.id !== popular?.id) {
      recommended.push({ ...bestValue, badge: 'Best Value', badgeColor: '#F59E0B' });
    }
    
    // Long validity
    const longValidity = plans.find(p => p.validity >= 300) || plans[plans.length - 1];
    if (longValidity && !recommended.find(r => r.id === longValidity.id)) {
      recommended.push({ ...longValidity, badge: 'Long Validity', badgeColor: '#8B5CF6' });
    }
    
    return recommended.slice(0, 3);
  };

  const getRemainingPlans = () => {
    const recommended = getRecommendedPlans();
    const recommendedIds = recommended.map(p => p.id);
    return getCurrentPlans().filter(p => !recommendedIds.includes(p.id));
  };

  const getAvailableCategories = () => {
    const available = categories.filter(cat => allPlans[selectedOperator]?.[cat.id]?.length > 0);
    return available.length > 0 ? available : [{ id: 'popular', name: 'Popular' }];
  };

  const handleRecharge = (plan) => {
    const operatorName = operators.find(op => op.id === selectedOperator)?.name;
    setToastMessage(`Proceeding to recharge for ₹${plan.price} – ${operatorName}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      {/* Hero Section - Reduced Height */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-slate-600/10"></div>
        <div className="relative px-6 py-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              Find Your Perfect Plan
            </h1>
            <p className="text-lg text-slate-600 mb-6">
              Compare plans and recharge instantly. All operators, best prices.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Operator Pills */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Choose Operator</h3>
            <div className="flex flex-wrap gap-3">
              {operators.map((operator) => (
                <button
                  key={operator.id}
                  onClick={() => {
                    setSelectedOperator(operator.id);
                    setSelectedCategory('popular');
                    setShowAllPlans(false);
                  }}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border ${
                    selectedOperator === operator.id
                      ? 'bg-gradient-to-r from-gray-600 to-slate-600 text-white border-gray-500 shadow-lg shadow-gray-500/25'
                      : 'bg-white/80 text-slate-600 border-gray-200 hover:bg-white hover:text-slate-800'
                  }`}
                >
                  <img src={operator.logo} alt={operator.name} className="w-6 h-6" />
                  <span className="font-medium">{operator.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Pills */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Plan Categories</h3>
            <div className="flex flex-wrap gap-2">
              {getAvailableCategories().map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setShowAllPlans(false);
                  }}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg shadow-gray-500/25'
                      : 'bg-white/80 text-slate-600 hover:bg-white hover:text-slate-800 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Plans Section */}
      <div className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Recommended</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getRecommendedPlans().map((plan) => {
              const getOTTChipStyle = (benefit) => {
                if (benefit.includes('Jio')) return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white';
                if (benefit.includes('Amazon') || benefit.includes('Prime')) return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
                if (benefit.includes('Wynk')) return 'bg-gradient-to-r from-amber-400 to-orange-500 text-white';
                if (benefit.includes('Disney') || benefit.includes('Hotstar')) return 'bg-gradient-to-r from-purple-400 to-purple-600 text-white';
                return 'bg-gray-600 text-white';
              };

              return (
                <div 
                  key={plan.id} 
                  className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group flex flex-col h-80"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Badge */}
                  <div 
                    className="absolute -top-3 left-6 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{ 
                      background: plan.badgeColor === '#10B981' ? 'linear-gradient(135deg, #10B981, #059669)' :
                                 plan.badgeColor === '#F59E0B' ? 'linear-gradient(135deg, #F59E0B, #D97706)' :
                                 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
                    }}
                  >
                    {plan.badge}
                  </div>

                  {/* Price & Validity */}
                  <div className="mb-4 mt-4 relative z-10">
                    <div className="text-3xl font-bold text-white mb-1">₹{plan.price}</div>
                    <div className="text-gray-400">{plan.validity} Days Validity</div>
                  </div>

                  {/* Plan Features */}
                  <div className="text-gray-300 mb-4 relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-icons text-emerald-400 text-sm">data_usage</span>
                      <span>{plan.data}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-icons text-blue-400 text-sm">call</span>
                      <span>{plan.calls}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-purple-400 text-sm">sms</span>
                      <span>{plan.sms}</span>
                    </div>
                  </div>

                  {/* OTT Benefits - Fixed Height */}
                  <div className="h-12 mb-4 relative z-10 flex-grow">
                    {plan.ott.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {plan.ott.map((benefit, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getOTTChipStyle(benefit)}`}
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full"></div>
                    )}
                  </div>

                  {/* CTA Button - Always at bottom */}
                  <button
                    onClick={() => handleRecharge(plan)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 relative z-10 mt-auto"
                  >
                    Recharge Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* All Plans Section */}
      <div className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">All Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getRemainingPlans().map((plan) => {
              const getOTTChipStyle = (benefit) => {
                if (benefit.includes('Jio')) return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white';
                if (benefit.includes('Amazon') || benefit.includes('Prime')) return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
                if (benefit.includes('Wynk')) return 'bg-gradient-to-r from-amber-400 to-orange-500 text-white';
                if (benefit.includes('Disney') || benefit.includes('Hotstar')) return 'bg-gradient-to-r from-purple-400 to-purple-600 text-white';
                return 'bg-gray-600 text-white';
              };

              return (
                <div 
                  key={plan.id} 
                  className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group flex flex-col h-80"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Price & Validity */}
                  <div className="mb-4 relative z-10">
                    <div className="text-3xl font-bold text-white mb-1">₹{plan.price}</div>
                    <div className="text-gray-400">{plan.validity} Days Validity</div>
                  </div>

                  {/* Plan Features */}
                  <div className="text-gray-300 mb-4 relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-icons text-emerald-400 text-sm">data_usage</span>
                      <span>{plan.data}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-icons text-blue-400 text-sm">call</span>
                      <span>{plan.calls}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-purple-400 text-sm">sms</span>
                      <span>{plan.sms}</span>
                    </div>
                  </div>

                  {/* OTT Benefits - Fixed Height */}
                  <div className="h-12 mb-4 relative z-10 flex-grow">
                    {plan.ott.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {plan.ott.map((benefit, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getOTTChipStyle(benefit)}`}
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full"></div>
                    )}
                  </div>

                  {/* CTA Button - Always at bottom */}
                  <button
                    onClick={() => handleRecharge(plan)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 relative z-10 mt-auto"
                  >
                    Recharge Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* No Plans Message */}
      {getCurrentPlans().length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-600 mb-2">No plans available for this category</div>
          <div className="text-sm text-slate-500">Try selecting a different category</div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Plans;