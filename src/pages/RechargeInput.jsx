import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RechargeInput = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState('');
  const [operator, setOperator] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const operatorPatterns = {
    jio: ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69'],
    airtel: ['70', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89'],
    vi: ['90', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
    bsnl: ['94', '95', '96', '97', '98', '99']
  };

  const operatorInfo = {
    jio: { name: 'Jio', logo: '🔵', color: 'bg-blue-100 text-blue-800' },
    airtel: { name: 'Airtel', logo: '🔴', color: 'bg-red-100 text-red-800' },
    vi: { name: 'Vi', logo: '🟣', color: 'bg-purple-100 text-purple-800' },
    bsnl: { name: 'BSNL', logo: '🟠', color: 'bg-orange-100 text-orange-800' }
  };

  const detectOperator = async (num) => {
    if (num.length !== 10) return null;
    
    setLoading(true);
    setError('');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const prefix = num.substring(0, 2);
    for (const [op, patterns] of Object.entries(operatorPatterns)) {
      if (patterns.includes(prefix)) {
        setLoading(false);
        return op;
      }
    }
    
    setLoading(false);
    return null;
  };

  useEffect(() => {
    if (number.length === 10) {
      detectOperator(number).then(setOperator);
    } else {
      setOperator(null);
      setError('');
    }
  }, [number]);

  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setNumber(value);
      if (value.length > 0 && value.length < 10) {
        setError('Please enter a 10-digit mobile number');
      } else {
        setError('');
      }
    }
  };

  const goToPlans = () => {
    if (number.length !== 10 || !operator) return;
    navigate(`/recharge/plans?number=${number}&operator=${operator}`);
  };

  const isValid = number.length === 10 && operator && !loading;

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
          <span className="material-icons">arrow_back</span>
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Mobile Recharge</h1>
        <p className="text-gray-600 mt-1">Enter your mobile number to get started</p>
      </div>

      {/* Main Card */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-6">
          {/* Mobile Number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                +91
              </div>
              <input
                type="tel"
                value={number}
                onChange={handleNumberChange}
                placeholder="Enter 10-digit mobile number"
                className={`w-full pl-12 pr-4 py-4 text-lg border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {loading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
            {error && (
              <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                <span className="material-icons text-sm">error</span>
                {error}
              </p>
            )}
          </div>

          {/* Operator Detection */}
          {operator && (
            <div className={`p-4 rounded-lg ${operatorInfo[operator].color} flex items-center gap-3`}>
              <span className="text-2xl">{operatorInfo[operator].logo}</span>
              <div>
                <h3 className="font-semibold">{operatorInfo[operator].name}</h3>
                <p className="text-sm opacity-80">Operator detected automatically</p>
              </div>
              <div className="ml-auto">
                <span className="material-icons text-green-600">check_circle</span>
              </div>
            </div>
          )}

          {/* Manual Operator Selection */}
          {number.length === 10 && !operator && !loading && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Operator
              </label>
              <select
                value={operator || ''}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose your operator</option>
                <option value="jio">Jio</option>
                <option value="airtel">Airtel</option>
                <option value="vi">Vi</option>
                <option value="bsnl">BSNL</option>
              </select>
            </div>
          )}

          {/* View Plans Button */}
          <div className="pt-4">
            <button
              onClick={goToPlans}
              disabled={!isValid}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                isValid
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Detecting operator...
                </div>
              ) : (
                'View Plans'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>We support all major operators: Jio, Airtel, Vi, and BSNL</p>
      </div>
    </div>
  );
};

export default RechargeInput;