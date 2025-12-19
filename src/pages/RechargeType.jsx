import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RechargeType = () => {
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();

  const rechargeTypes = [
    {
      id: 'prepaid',
      title: 'Prepaid Recharge',
      description: 'Instant top-up for prepaid mobile numbers',
      icon: 'smartphone',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'postpaid',
      title: 'Postpaid Bill Payment',
      description: 'Pay your monthly postpaid bills',
      icon: 'receipt_long',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'dth',
      title: 'DTH Recharge',
      description: 'Recharge your DTH connection',
      icon: 'tv',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'datacard',
      title: 'Data Card Recharge',
      description: 'Internet data card top-up',
      icon: 'wifi',
      gradient: 'from-green-500 to-green-600'
    }
  ];

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    navigate(`/recharge/mobile?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Choose Recharge Type</h1>
          <p className="text-gray-600">Select the type of recharge you want to do</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rechargeTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => handleTypeSelect(type.id)}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${type.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                <span className="material-icons text-white text-2xl">{type.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{type.title}</h3>
              <p className="text-gray-600 text-center mb-6">{type.description}</p>
              <div className="flex justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="material-icons text-white">info</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Quick Tip</h3>
              <p className="text-gray-600 text-sm">
                All recharges are processed instantly and you'll receive confirmation SMS immediately
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargeType;