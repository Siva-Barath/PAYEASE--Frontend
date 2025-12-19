import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bankSelection, setBankSelection] = useState('');
  const [walletSelection, setWalletSelection] = useState('');
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedPlan, addTransaction } = useApp();

  const mobile = searchParams.get('mobile');
  const operator = searchParams.get('operator');
  const planId = searchParams.get('planId');

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'credit_card',
      desc: 'Visa, Mastercard, RuPay'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: 'account_balance',
      desc: 'Google Pay, PhonePe, Paytm'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: 'account_balance',
      desc: 'All major banks'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: 'account_balance_wallet',
      desc: 'Paytm, Amazon Pay, etc.'
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);

    try {
      // Get recharge data from localStorage or URL params
      const rechargeData = JSON.parse(localStorage.getItem('rechargeData') || '{}');
      const amount = searchParams.get('amount') || rechargeData.plan?.price || 0;
      
      // Validate payment method details
      if (selectedMethod === 'upi' && !upiId) {
        alert('Please enter UPI ID');
        setIsProcessing(false);
        return;
      }
      if (selectedMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name)) {
        alert('Please fill all card details');
        setIsProcessing(false);
        return;
      }
      if (selectedMethod === 'netbanking' && !bankSelection) {
        alert('Please select a bank');
        setIsProcessing(false);
        return;
      }
      if (selectedMethod === 'wallet' && !walletSelection) {
        alert('Please select a wallet');
        setIsProcessing(false);
        return;
      }
      
      // Call backend API to create recharge
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('http://localhost:3001/api/recharges', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            phoneNumber: mobile,
            operator,
            planId,
            amount: Number(amount),
            paymentMethod: selectedMethod
          })
        });

        if (!response.ok) {
          throw new Error('Payment failed');
        }

        const recharge = await response.json();
        console.log('Recharge created:', recharge);
        
        // Refresh transactions in context
        if (window.location.pathname !== '/history') {
          // Only refresh if not on history page to avoid double fetch
          setTimeout(() => {
            window.dispatchEvent(new Event('recharge-completed'));
          }, 100);
        }
        
        localStorage.removeItem('rechargeData');
        navigate(`/success?txnId=${recharge.transactionId}`);
      } else {
        // For non-logged in users, simulate payment
        await new Promise(resolve => setTimeout(resolve, 2000));
        const txnId = 'TXN' + Date.now();
        localStorage.removeItem('rechargeData');
        navigate(`/success?txnId=${txnId}`);
      }


    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const getOperatorName = () => {
    const names = { jio: 'Jio', airtel: 'Airtel', vi: 'Vi', bsnl: 'BSNL' };
    return names[operator] || operator;
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
            <span className="material-icons text-white text-2xl">sync</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Processing Payment</h2>
          <p className="text-gray-600 mb-6">Please wait while we process your payment securely...</p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Select Payment Method</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="material-icons text-blue-600">{method.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-800">{method.name}</h3>
                        <p className="text-xs text-gray-600">{method.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Form */}
              {selectedMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {selectedMethod === 'upi' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@paytm"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}

              {selectedMethod === 'netbanking' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={bankSelection}
                    onChange={(e) => setBankSelection(e.target.value)}
                  >
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                  </select>
                </div>
              )}

              {selectedMethod === 'wallet' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Wallet</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={walletSelection}
                    onChange={(e) => setWalletSelection(e.target.value)}
                  >
                    <option value="">Choose wallet</option>
                    <option value="paytm">Paytm</option>
                    <option value="amazonpay">Amazon Pay</option>
                    <option value="mobikwik">MobiKwik</option>
                    <option value="phonepe">PhonePe</option>
                    <option value="googlepay">Google Pay</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mobile Number</span>
                  <span className="font-medium">{mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Operator</span>
                  <span className="font-medium">{getOperatorName()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium">₹{searchParams.get('amount') || selectedPlan?.price || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Validity</span>
                  <span className="font-medium">{selectedPlan?.validity || '28 days'}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>₹{searchParams.get('amount') || selectedPlan?.price || 0}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!selectedMethod || isProcessing}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
                  selectedMethod && !isProcessing
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isProcessing ? 'Processing...' : `Pay ₹${searchParams.get('amount') || selectedPlan?.price || 0}`}
              </button>
              
              {!localStorage.getItem('token') && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    💡 <strong>Tip:</strong> <Link to="/login" className="underline hover:text-blue-800">Login</Link> to save your recharge history and view it in your dashboard.
                  </p>
                </div>
              )}

              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                <span className="material-icons text-green-600" style={{ fontSize: '16px' }}>security</span>
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;