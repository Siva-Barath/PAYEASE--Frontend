const Wallet = () => {
  const balance = 1250;
  const transactions = [
    { id: 1, type: 'credit', amount: 500, desc: 'Added money', date: '2024-01-15' },
    { id: 2, type: 'debit', amount: 299, desc: 'Mobile recharge', date: '2024-01-14' },
    { id: 3, type: 'credit', amount: 1000, desc: 'Cashback received', date: '2024-01-13' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Wallet</h1>
        <p className="text-gray-600 mt-1">Manage your wallet balance and transactions</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 mb-2">Available Balance</p>
            <h2 className="text-3xl font-bold">₹{balance}</h2>
          </div>
          <span className="material-icons text-4xl text-green-200">account_balance_wallet</span>
        </div>
        <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold mt-4 hover:bg-green-50 transition-colors">
          Add Money
        </button>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {transactions.map((txn) => (
            <div key={txn.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  txn.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <span className={`material-icons ${
                    txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {txn.type === 'credit' ? 'add' : 'remove'}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{txn.desc}</h4>
                  <p className="text-sm text-gray-500">{txn.date}</p>
                </div>
              </div>
              <span className={`font-semibold ${
                txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;