import { useState } from 'react';

const BillPayment = ({ onNavigate, type = 'electricity' }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  const billTypes = {
    electricity: { icon: '⚡', title: 'Electricity Bill', placeholder: 'Consumer Number' },
    water: { icon: '💧', title: 'Water Bill', placeholder: 'Consumer ID' },
    gas: { icon: '🔥', title: 'Gas Bill', placeholder: 'Customer ID' },
  };

  const current = billTypes[type] || billTypes.electricity;

  const handlePay = () => {
    if (accountNumber && amount) {
      onNavigate('dashboard');
      setTimeout(() => {
        alert(`✅ Bill payment successful!\n\n${current.title}\n${current.placeholder}: ${accountNumber}\nAmount: ₹${amount}\nStatus: Completed`);
      }, 500);
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 font-semibold">
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-5xl">{current.icon}</div>
          <h2 className="text-2xl font-bold">{current.title}</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">{current.placeholder}</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder={`Enter ${current.placeholder}`}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handlePay}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl mt-6"
          >
            Pay Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillPayment;
