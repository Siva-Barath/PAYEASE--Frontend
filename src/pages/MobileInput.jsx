import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const MobileInput = () => {
  const [mobile, setMobile] = useState('');
  const [operator, setOperator] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setSelectedOperator } = useApp();

  const rechargeType = searchParams.get('type') || 'prepaid';

  const operators = [
    { id: 'jio', name: 'Jio', logo: '/api/placeholder/40/40' },
    { id: 'airtel', name: 'Airtel', logo: '/api/placeholder/40/40' },
    { id: 'vi', name: 'Vi', logo: '/api/placeholder/40/40' },
    { id: 'bsnl', name: 'BSNL', logo: '/api/placeholder/40/40' }
  ];

  // Auto-detect operator based on mobile number
  const detectOperator = (number) => {
    const num = number.replace(/\D/g, '');
    if (num.startsWith('6') || num.startsWith('7') || num.startsWith('8') || num.startsWith('9')) {
      // Simple operator detection logic
      if (num.startsWith('6') || num.startsWith('7')) return 'jio';
      if (num.startsWith('8')) return 'airtel';
      if (num.startsWith('9')) return 'vi';
    }
    return '';
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setMobile(value);
      if (value.length === 10) {
        const detectedOp = detectOperator(value);
        setOperator(detectedOp);
      }
    }
  };

  const handleContinue = () => {
    if (mobile.length === 10 && operator) {
      setSelectedOperator(operator);
      navigate(`/plans?mobile=${mobile}&operator=${operator}&type=${rechargeType}`);
    }
  };

  const getTypeTitle = () => {
    switch (rechargeType) {
      case 'prepaid': return 'Prepaid Recharge';
      case 'postpaid': return 'Postpaid Bill Payment';
      case 'dth': return 'DTH Recharge';
      case 'datacard': return 'Data Card Recharge';
      default: return 'Mobile Recharge';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{getTypeTitle()}</h1>
          <p className="text-gray-600">Enter your mobile number and select operator</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Mobile Number Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">+91</span>
              </div>
              <input
                type="tel"
                value={mobile}
                onChange={handleMobileChange}
                placeholder="Enter 10-digit mobile number"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                maxLength="10"
              />
            </div>
            {mobile.length > 0 && mobile.length < 10 && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid 10-digit mobile number</p>
            )}
          </div>

          {/* Operator Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Select Operator
            </label>
            <div className="grid grid-cols-2 gap-4">
              {operators.map((op) => (
                <div
                  key={op.id}
                  onClick={() => setOperator(op.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    operator === op.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img src={op.logo} alt={op.name} className="w-10 h-10 rounded-lg" />
                    <span className="font-medium text-gray-800">{op.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={mobile.length !== 10 || !operator}
            className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
              mobile.length === 10 && operator
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Plans
          </button>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="material-icons text-white text-sm">security</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Secure & Fast</h3>
              <p className="text-gray-600 text-xs">Your mobile number is safe and recharge is instant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileInput;