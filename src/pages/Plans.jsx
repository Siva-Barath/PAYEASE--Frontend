import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import API_CONFIG from '../config/api';
import jioLogo from '../assets/jio.jpeg';
import airtelLogo from '../assets/airtel.png';
import viLogo from '../assets/vi.webp';
import bsnlLogo from '../assets/bsnl-logo.jpg';
import backgroundImage from '../assets/background-image2.jpg';

const Plans = () => {
  const { user } = useApp();
  const [selectedOperator, setSelectedOperator] = useState('Jio');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [backendPlans, setBackendPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedPlanForRecharge, setSelectedPlanForRecharge] = useState(null);

  const API_BASE_URL = API_CONFIG.BASE_URL;

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      let allPlans = [];
      
      // Try to fetch from user plans endpoint
      try {
        const userResponse = await fetch(`${API_BASE_URL}/plans`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          allPlans = [...allPlans, ...userData];
        }
      } catch (error) {
        console.log('User plans API failed');
      }
      
      // Try to fetch from admin plans endpoint
      try {
        const adminResponse = await fetch(`${API_BASE_URL}/admin/plans`);
        if (adminResponse.ok) {
          const adminData = await adminResponse.json();
          allPlans = [...allPlans, ...adminData];
        }
      } catch (error) {
        console.log('Admin plans API failed');
      }
      
      // Also get admin plans from localStorage
      const adminPlansFromStorage = JSON.parse(localStorage.getItem('adminPlans') || '[]');
      allPlans = [...allPlans, ...adminPlansFromStorage];
      
      // Remove duplicates based on _id
      const uniquePlans = allPlans.filter((plan, index, self) => 
        index === self.findIndex(p => p._id === plan._id)
      );
      
      setBackendPlans(uniquePlans.length > 0 ? uniquePlans : []);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setBackendPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const operators = [
    { id: 'Jio', name: 'Jio', logo: jioLogo, color: 'bg-blue-600' },
    { id: 'Airtel', name: 'Airtel', logo: airtelLogo, color: 'bg-red-600' },
    { id: 'Vi', name: 'Vi', logo: viLogo, color: 'bg-purple-600' },
    { id: 'BSNL', name: 'BSNL', logo: bsnlLogo, color: 'bg-orange-600' }
  ];

  const categories = [
    { id: 'all', name: 'All Plans' },
    { id: 'Popular', name: 'Popular' },
    { id: 'Unlimited', name: 'Unlimited' },
    { id: 'Data Packs', name: 'Data Packs' },
    { id: 'Annual', name: 'Annual' },
    { id: 'Talktime', name: 'Talktime' }
  ];



  const getCurrentPlans = () => {
    // Get plans from backend only
    let operatorPlans = backendPlans.filter(plan => plan.operator === selectedOperator);
    
    // Apply category filter
    if (selectedCategory === 'Popular') {
      operatorPlans = operatorPlans.filter(plan => plan.popular);
    } else if (selectedCategory !== 'all') {
      operatorPlans = operatorPlans.filter(plan => plan.category === selectedCategory);
    }
    // For 'all' category, show all plans for the operator
    
    // Convert backend plans to frontend format
    const backendPlansFormatted = operatorPlans.map(plan => ({
      id: plan._id,
      price: plan.price,
      validity: plan.validity,
      data: plan.data,
      calls: plan.calls,
      sms: plan.sms,
      ott: plan.benefits || [],
      isPopular: plan.popular,
      category: plan.category,
      highlight: plan.highlight
    }));
    
    return backendPlansFormatted;
  };

  const getRecommendedPlans = () => {
    const plans = getCurrentPlans();
    if (plans.length === 0) return [];
    
    // Get 3 recommended plans with different characteristics
    const recommended = [];
    
    // Find plans with specific highlights
    const recommendedPlan = plans.find(p => p.highlight === 'Recommended');
    if (recommendedPlan) {
      recommended.push({ ...recommendedPlan, badge: 'Recommended', badgeColor: '#10B981' });
    }
    
    const bestValuePlan = plans.find(p => p.highlight === 'Best Value');
    if (bestValuePlan && bestValuePlan.id !== recommendedPlan?.id) {
      recommended.push({ ...bestValuePlan, badge: 'Best Value', badgeColor: '#F59E0B' });
    }
    
    const longValidityPlan = plans.find(p => p.highlight === 'Long Validity');
    if (longValidityPlan && !recommended.find(r => r.id === longValidityPlan.id)) {
      recommended.push({ ...longValidityPlan, badge: 'Long Validity', badgeColor: '#8B5CF6' });
    }
    
    // If we don't have enough, add popular plans
    if (recommended.length < 3) {
      const popularPlans = plans.filter(p => p.isPopular && !recommended.find(r => r.id === p.id));
      popularPlans.slice(0, 3 - recommended.length).forEach(plan => {
        recommended.push({ ...plan, badge: plan.highlight, badgeColor: '#6366F1' });
      });
    }
    
    return recommended.slice(0, 3);
  };

  const getRemainingPlans = () => {
    const recommended = getRecommendedPlans();
    const recommendedIds = recommended.map(p => p.id);
    return getCurrentPlans().filter(p => !recommendedIds.includes(p.id));
  };

  const getAvailableCategories = () => {
    const operatorPlans = backendPlans.filter(plan => plan.operator === selectedOperator);
    const available = [];
    
    // Always show 'All Plans'
    available.push({ id: 'all', name: 'All Plans' });
    
    // Show 'Popular' if there are popular plans
    const hasPopular = operatorPlans.some(plan => plan.popular);
    if (hasPopular) {
      available.push({ id: 'Popular', name: 'Popular' });
    }
    
    // Show categories based on available backend plans
    const availableCategories = [...new Set(operatorPlans.map(plan => plan.category))];
    availableCategories.forEach(cat => {
      const categoryObj = categories.find(c => c.id === cat);
      if (categoryObj && !available.find(a => a.id === cat)) {
        available.push(categoryObj);
      }
    });
    
    return available;
  };

  const handleRecharge = (plan) => {
    // Store plan data in localStorage
    const rechargeData = {
      plan: plan,
      operator: selectedOperator
    };
    localStorage.setItem('rechargeData', JSON.stringify(rechargeData));
    
    // If user is logged in, go to payment page
    if (user) {
      window.location.href = `/payment?mobile=${user.phone}&operator=${selectedOperator}&planId=${plan.id}&amount=${plan.price}`;
    } else {
      // If not logged in, show mobile number modal
      setSelectedPlanForRecharge(plan);
      setShowMobileModal(true);
    }
  };

  const handleMobileSubmit = () => {
    if (mobileNumber && mobileNumber.length === 10) {
      setShowMobileModal(false);
      window.location.href = `/payment?mobile=${mobileNumber}&operator=${selectedOperator}&planId=${selectedPlanForRecharge.id}&amount=${selectedPlanForRecharge.price}`;
    }
  };

  const closeMobileModal = () => {
    setShowMobileModal(false);
    setMobileNumber('');
    setSelectedPlanForRecharge(null);
  };

  const PlanCard = ({ plan, isRecommended = false }) => {
    const getOTTChipStyle = (benefit) => {
      return { background: '#6366F1', color: '#F8FAFC' };
    };

    return (
      <div 
        className="relative rounded-2xl p-6 transition-all duration-300 hover:scale-105 group flex flex-col h-80"
        style={{ 
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #6366F1/20, #4F46E5/20)' }}></div>
        
        {/* Badge */}
        {isRecommended && (
          <div 
            className="absolute -top-3 left-6 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg"
            style={{ 
              background: plan.badge === 'Recommended' ? '#22C55E' :
                         plan.badge === 'Best Value' ? '#F59E0B' :
                         '#6366F1',
              color: plan.badge === 'Recommended' ? '#052E16' :
                     plan.badge === 'Best Value' ? '#451A03' :
                     '#EEF2FF'
            }}
          >
            {plan.badge}
          </div>
        )}

        {/* Price & Validity */}
        <div className={`mb-4 ${isRecommended ? 'mt-4' : ''} relative z-10`}>
          <div className="text-3xl font-bold mb-1" style={{ color: '#F8FAFC', fontWeight: '700' }}>₹{plan.price}</div>
          <div style={{ color: '#CBD5E1' }}>{plan.validity} Days Validity</div>
        </div>

        {/* Plan Features */}
        <div className="mb-4 relative z-10" style={{ color: '#CBD5E1' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-icons text-sm" style={{ color: '#22C55E' }}>data_usage</span>
            <span>{plan.data}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-icons text-sm" style={{ color: '#22C55E' }}>call</span>
            <span>{plan.calls}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons text-sm" style={{ color: '#22C55E' }}>sms</span>
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
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={getOTTChipStyle(benefit)}
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
          className="w-full py-3 rounded-xl font-semibold transition-all duration-300 relative z-10 mt-auto"
          style={{ 
            background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
            color: '#F8FAFC'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #4F46E5, #4338CA)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #6366F1, #4F46E5)';
          }}
        >
          Recharge Now
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ 
      background: `linear-gradient(rgba(10, 15, 25, 0.85), rgba(10, 15, 25, 0.85)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      {/* Hero Section */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>
            Find Your Perfect Plan
          </h1>
          <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
            Compare plans and recharge instantly
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="px-6 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="p-6 rounded-2xl" style={{ 
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {/* Row 1: Select Operator */}
            <div className="mb-4">
              <h3 className="text-base font-semibold mb-4" style={{ color: '#ffffff' }}>Select Operator</h3>
              <div className="flex justify-center gap-16 mb-4">
                {operators.map((operator) => (
                  <button
                    key={operator.id}
                    onClick={() => {
                      setSelectedOperator(operator.id);
                      setSelectedCategory('all');
                      setShowAllPlans(false);
                    }}
                    className="flex flex-col items-center transition-all duration-300"
                    style={{ width: '72px', textAlign: 'center' }}
                  >
                    <img 
                      src={operator.logo} 
                      alt={operator.name} 
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        objectFit: 'contain',
                        background: '#fff',
                        padding: '6px',
                        border: selectedOperator === operator.id 
                          ? '2px solid #6366f1' 
                          : '2px solid rgba(255,255,255,0.1)',
                        boxShadow: selectedOperator === operator.id 
                          ? '0 0 12px rgba(99, 102, 241, 0.4)' 
                          : 'none'
                      }}
                    />
                    <span 
                      style={{ 
                        fontSize: '12px',
                        fontWeight: '500',
                        color: selectedOperator === operator.id ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                        marginTop: '6px'
                      }}
                    >
                      {operator.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ 
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
              margin: '16px 0'
            }}></div>

            {/* Row 2: Categories */}
            <div>
              <h3 className="text-base font-semibold mb-4" style={{ color: '#ffffff' }}>Categories</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {getAvailableCategories().map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setShowAllPlans(false);
                    }}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      height: '38px',
                      padding: '0 18px',
                      fontSize: '13px',
                      fontWeight: '500',
                      background: selectedCategory === category.id 
                        ? 'linear-gradient(135deg, #6366f1, #4f46e5)' 
                        : 'rgba(255,255,255,0.05)',
                      color: selectedCategory === category.id ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                      border: 'none'
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div style={{ 
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
        margin: '24px 0'
      }}></div>

      {/* Plans Section */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Featured Plans */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-6" style={{ color: '#ffffff' }}>Recommended Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getRecommendedPlans().map((plan) => (
                <PlanCard key={plan.id} plan={plan} isRecommended={true} />
              ))}
            </div>
          </div>

          {/* All Plans */}
          <div>
            <h3 className="text-xl font-semibold mb-6" style={{ color: '#ffffff' }}>All Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getRemainingPlans().map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* No Plans Message */}
      {getCurrentPlans().length === 0 && (
        <div className="text-center py-12">
          <div className="mb-2" style={{ color: '#ffffff' }}>No plans available for this category</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Try selecting a different category</div>
        </div>
      )}

      {/* Mobile Number Modal */}
      {showMobileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Enter Mobile Number</h3>
              <button onClick={closeMobileModal} className="text-gray-500 hover:text-gray-700">
                <span className="material-icons">close</span>
              </button>
            </div>
            <p className="text-gray-600 mb-4">Please enter your mobile number to proceed with recharge</p>
            <div className="mb-4">
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter 10-digit mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength="10"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={closeMobileModal}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleMobileSubmit}
                disabled={mobileNumber.length !== 10}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  mobileNumber.length === 10
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50" style={{ 
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#ffffff'
        }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Plans;