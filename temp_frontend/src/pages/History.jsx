import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const History = () => {
  const { transactions, fetchUserTransactions } = useApp();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchUserTransactions();
    
    // Listen for recharge completion events
    const handleRechargeCompleted = () => {
      fetchUserTransactions();
    };
    
    window.addEventListener('recharge-completed', handleRechargeCompleted);
    
    return () => {
      window.removeEventListener('recharge-completed', handleRechargeCompleted);
    };
  }, []);

  const filters = [
    { id: 'all', label: 'All', count: transactions.length },
    { id: 'success', label: 'Success', count: transactions.filter(t => t.status === 'success').length },
    { id: 'pending', label: 'Pending', count: transactions.filter(t => t.status === 'pending').length },
    { id: 'failed', label: 'Failed', count: transactions.filter(t => t.status === 'failed').length },
  ];

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.status === filter);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return { icon: 'check_circle', color: 'text-green-600' };
      case 'pending': return { icon: 'schedule', color: 'text-orange-600' };
      case 'failed': return { icon: 'cancel', color: 'text-red-600' };
      default: return { icon: 'help', color: 'text-gray-600' };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Transaction History</h1>
        <p className="text-gray-600 mt-1">View all your recharge and bill payment transactions</p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {filters.map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              filter === filterOption.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {filterOption.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              filter === filterOption.id
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {filterOption.count}
            </span>
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl border border-gray-200">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <span className="material-icons text-6xl text-gray-300 mb-4">receipt_long</span>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {filter === 'all' ? 'No transactions yet' : `No ${filter} transactions`}
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' 
                ? 'Your transaction history will appear here' 
                : `You don't have any ${filter} transactions`
              }
            </p>
            <Link to="/recharge" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
              Start Recharging
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => {
              const statusInfo = getStatusIcon(transaction.status);
              return (
                <div key={transaction._id || transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="material-icons text-blue-600">smartphone</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Mobile Recharge ₹{transaction.amount}
                        </h4>
                        <p className="text-sm text-gray-500">
                          +91 {transaction.phoneNumber} • {transaction.operator?.toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(transaction.status)}`}>
                        {transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)}
                      </span>
                      <span className={`material-icons ${statusInfo.color}`}>
                        {statusInfo.icon}
                      </span>
                      <span className="material-icons text-gray-400">chevron_right</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;