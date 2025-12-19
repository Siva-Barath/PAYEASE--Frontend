import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { planData, operatorPatterns, operatorLogos } from '../data/planData';
import PlanCard from '../components/PlanCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Recharge = ({ onNavigate }) => {
  const [mobile, setMobile] = useState('');
  const [operator, setOperator] = useState('');
  const [category, setCategory] = useState('popular');
  const [loading, setLoading] = useState(false);
  const { setSelectedOperator, setSelectedPlan } = useApp();

  const detectOperator = (number) => {
    const prefix = number.substring(0, 2);
    for (const [op, patterns] of Object.entries(operatorPatterns)) {
      if (patterns.includes(prefix)) return op;
    }
    return '';
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    if (value.length === 10) {
      const detected = detectOperator(value);
      setOperator(detected);
      setSelectedOperator(detected);
    } else {
      setOperator('');
    }
  };

  const handlePlanSelect = (plan) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedPlan(plan);
      setLoading(false);
      onNavigate('payment');
    }, 1500);
  };

  const plans = operator ? planData[operator]?.[category] || [] : [];

  return (
    <>
      {loading && <LoadingSpinner message="Loading plans..." />}
      <div className="min-h-screen" style={{ backgroundColor: '#F8F9FC' }}>
        {/* Header */}
        <div className="bg-white p-6 flex items-center gap-4" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
          <button onClick={() => onNavigate('dashboard')} className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <span className="material-icons">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold" style={{ color: '#1A1A1A' }}>Mobile Recharge</h1>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">

          <div className="bg-white rounded-2xl p-5 mb-6" style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)' }}>
            <h3 className="text-base font-bold mb-4" style={{ color: '#1A1A1A' }}>Mobile Number</h3>
            <div className="mb-4">
              <input
                type="tel"
                value={mobile}
                onChange={handleMobileChange}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-4 text-base focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            {operator && (
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-xs ${operator === 'airtel' ? 'bg-red-600' : operator === 'jio' ? 'bg-blue-600' : operator === 'vi' ? 'bg-purple-600' : 'bg-orange-600'}`}>
                  {operator.toUpperCase().substring(0, 3)}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base" style={{ color: '#1A1A1A' }}>{operatorLogos[operator]?.name || operator.charAt(0).toUpperCase() + operator.slice(1)}</h4>
                  <p className="text-sm" style={{ color: '#6F6F6F' }}>Delhi Circle</p>
                </div>
                <span className="material-icons text-green-600">check_circle</span>
              </div>
            )}
          </div>

          {operator && (
            <div>
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['popular', 'unlimited', 'data', 'combo', 'validity'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-5 py-3 rounded-2xl font-medium whitespace-nowrap transition-all ${
                      category === cat 
                        ? 'bg-blue-600 text-white border-2 border-blue-600' 
                        : 'bg-white border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50'
                    }`}
                    style={category === cat ? { background: '#3A7BFF', borderColor: '#3A7BFF' } : {}}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid gap-4">
                {plans.length > 0 ? (
                  plans.map((plan, idx) => (
                    <PlanCard 
                      key={idx} 
                      plan={plan} 
                      isPopular={plan.popular}
                      onSelect={() => handlePlanSelect(plan)} 
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p style={{ color: '#6F6F6F' }}>No plans available for this category</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Recharge;
