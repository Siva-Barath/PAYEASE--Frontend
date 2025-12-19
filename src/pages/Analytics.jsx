import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Analytics = ({ onNavigate }) => {
  const { transactions } = useApp();
  const [timeframe, setTimeframe] = useState('month');

  const monthlySpending = 1250;
  const avgRecharge = 299;
  const totalRecharges = 8;
  const savings = 125;

  const spendingData = [
    { category: 'Mobile Recharge', amount: 850, percentage: 68 },
    { category: 'Bill Payments', amount: 300, percentage: 24 },
    { category: 'DTH', amount: 100, percentage: 8 }
  ];

  const suggestions = [
    {
      title: 'Switch to Annual Plan',
      desc: 'Save ₹600/year by switching to Jio annual plan',
      savings: '₹600',
      action: 'View Plans'
    },
    {
      title: 'Enable Auto-Recharge',
      desc: 'Never miss a recharge and get 2% extra cashback',
      savings: '₹50',
      action: 'Set Up'
    },
    {
      title: 'Use Family Plan',
      desc: 'Add 3 more numbers and save ₹200/month',
      savings: '₹200',
      action: 'Learn More'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 font-semibold">
        ← Back
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Spending Insights</h1>
        <p className="text-gray-600">Understand your usage patterns and save more</p>
      </div>

      {/* Time Filter */}
      <div className="flex gap-2 mb-6">
        {['week', 'month', 'quarter', 'year'].map(period => (
          <button
            key={period}
            onClick={() => setTimeframe(period)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize ${
              timeframe === period 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border-2 border-gray-200'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-2xl mb-2">💰</div>
          <p className="text-sm text-gray-600">Total Spent</p>
          <p className="text-2xl font-bold text-blue-600">₹{monthlySpending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-2xl mb-2">📱</div>
          <p className="text-sm text-gray-600">Avg Recharge</p>
          <p className="text-2xl font-bold text-green-600">₹{avgRecharge}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-2xl mb-2">🔄</div>
          <p className="text-sm text-gray-600">Recharges</p>
          <p className="text-2xl font-bold text-purple-600">{totalRecharges}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-2xl mb-2">🎁</div>
          <p className="text-sm text-gray-600">Savings</p>
          <p className="text-2xl font-bold text-orange-600">₹{savings}</p>
        </div>
      </div>

      {/* Spending Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h3 className="text-xl font-bold mb-6">Spending Breakdown</h3>
        <div className="space-y-4">
          {spendingData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-500" style={{backgroundColor: `hsl(${idx * 120}, 70%, 50%)`}}></div>
                <span className="font-semibold">{item.category}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500" 
                    style={{width: `${item.percentage}%`, backgroundColor: `hsl(${idx * 120}, 70%, 50%)`}}
                  ></div>
                </div>
                <span className="font-bold text-gray-800 w-16 text-right">₹{item.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Suggestions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-6">💡 Smart Suggestions</h3>
        <div className="space-y-4">
          {suggestions.map((suggestion, idx) => (
            <div key={idx} className="border-2 border-gray-100 rounded-xl p-4 hover:border-blue-300 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{suggestion.title}</h4>
                  <p className="text-gray-600 mb-3">{suggestion.desc}</p>
                  <div className="flex items-center gap-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                      Save {suggestion.savings}
                    </span>
                    <button className="text-blue-600 font-semibold hover:underline">
                      {suggestion.action} →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;