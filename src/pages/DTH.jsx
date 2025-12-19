import { useState } from 'react';

const DTH = ({ onNavigate }) => {
  const [subscriberId, setSubscriberId] = useState('');
  const [operator, setOperator] = useState('');

  const operators = ['Tata Play', 'Airtel Digital TV', 'Dish TV', 'Sun Direct', 'd2h'];

  const handleRecharge = () => {
    if (subscriberId && operator) {
      alert(`DTH recharge initiated for ${operator} - ${subscriberId}`);
      onNavigate('dashboard');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 font-semibold">
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-5xl">📺</div>
          <h2 className="text-2xl font-bold">DTH Recharge</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Select Operator</label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
            >
              <option value="">Choose DTH Operator</option>
              {operators.map((op) => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Subscriber ID / VC Number</label>
            <input
              type="text"
              value={subscriberId}
              onChange={(e) => setSubscriberId(e.target.value)}
              placeholder="Enter Subscriber ID"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handleRecharge}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl mt-6"
          >
            Proceed to Recharge
          </button>
        </div>
      </div>
    </div>
  );
};

export default DTH;
