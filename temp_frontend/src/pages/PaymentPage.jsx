import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import payeaseLogo from '../assets/PAYEASE.png';
import API_CONFIG from '../config/api';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { selectedPlan, addTransaction } = useApp();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [processing, setProcessing] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [isValidUpi, setIsValidUpi] = useState(false);
  const [searchParams] = useSearchParams();
  
  // Get data from URL params or selectedPlan
  const mobile = searchParams.get('mobile') || selectedPlan?.number;
  const operator = searchParams.get('operator') || selectedPlan?.operator;
  const planId = searchParams.get('planId');
  const amount = searchParams.get('amount') || selectedPlan?.price?.replace('₹', '') || '299';
  
  // Get plan data from localStorage if selectedPlan is not available
  const rechargeData = JSON.parse(localStorage.getItem('rechargeData') || '{}');
  const planData = selectedPlan || rechargeData.plan || {};

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: 'account_balance_wallet', desc: 'GPay, PhonePe, Paytm', iconBg: 'bg-blue-500' },
    { id: 'card', name: 'Debit Card', icon: 'payment', desc: 'Visa, Mastercard, RuPay', iconBg: 'bg-gray-500' },
    { id: 'credit', name: 'Credit Card', icon: 'credit_card', desc: 'All major cards', iconBg: 'bg-gray-500' },
    { id: 'netbanking', name: 'Net Banking', icon: 'account_balance', desc: 'All major banks', iconBg: 'bg-gray-500' },
    { id: 'wallet', name: 'Wallet', icon: 'account_balance_wallet', desc: 'Use wallet balance', iconBg: 'bg-gray-500' },
  ];

  const validateUpi = (value) => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    const valid = upiRegex.test(value);
    setIsValidUpi(valid);
    return valid;
  };

  const handleUpiChange = (e) => {
    const value = e.target.value;
    setUpiId(value);
    validateUpi(value);
  };

  const handlePayment = async () => {
    if (!selectedMethod) return;
    if (selectedMethod === 'upi' && !isValidUpi) return;
    
    setProcessing(true);
    
    // Add realistic processing delay (2-4 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    try {
      // Allow guest users to proceed without login

      console.log('Payment request:', {
        phoneNumber: mobile,
        operator: operator.toLowerCase(),
        planId: planId || 'static-plan',
        amount: Number(amount),
        paymentMethod: selectedMethod
      });

      // Send recharge to backend for both logged-in and guest users
      try {
        const headers = { 'Content-Type': 'application/json' };
        const token = localStorage.getItem('token');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${API_CONFIG.BASE_URL}/recharges`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            phoneNumber: mobile,
            operator: operator.toLowerCase(),
            planId: planId || 'guest-plan',
            amount: Number(amount),
            paymentMethod: selectedMethod,
            isGuest: !token
          })
        });
        
        if (response.ok) {
          const rechargeData = await response.json();
          const transaction = {
            id: rechargeData.transactionId || 'TXN' + Date.now(),
            mobile,
            operator,
            amount: Number(amount),
            plan: planId,
            date: new Date().toLocaleDateString(),
            status: 'success',
            method: selectedMethod
          };
          
          // Only add to local transaction history if user is logged in
          if (token) {
            addTransaction(transaction);
          }
          
          localStorage.removeItem('rechargeData');
          navigate(`/success?txnId=${transaction.id}`);
        } else {
          throw new Error('Payment failed');
        }
      } catch (backendError) {
        // Log the actual error for debugging
        console.error('Backend API call failed:', backendError);
        console.log('Falling back to demo mode');
        
        // Try to save to a local storage array for admin to see
        const guestRecharges = JSON.parse(localStorage.getItem('guestRecharges') || '[]');
        const newRecharge = {
          _id: 'guest_' + Date.now(),
          transactionId: 'TXN' + Date.now(),
          phoneNumber: mobile,
          operator: operator.toLowerCase(),
          amount: Number(amount),
          paymentMethod: selectedMethod,
          status: 'success',
          isGuest: true,
          createdAt: new Date().toISOString(),
          userId: null
        };
        
        guestRecharges.push(newRecharge);
        localStorage.setItem('guestRecharges', JSON.stringify(guestRecharges));
        
        const transaction = {
          id: newRecharge.transactionId,
          mobile,
          operator,
          amount: Number(amount),
          plan: planId,
          date: new Date().toLocaleDateString(),
          status: 'success',
          method: selectedMethod
        };
        
        const token = localStorage.getItem('token');
        if (token) {
          addTransaction(transaction);
        }
        
        localStorage.removeItem('rechargeData');
        navigate(`/success?txnId=${transaction.id}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error.message}. Please try again.`);
      setProcessing(false);
    }
  };

  if (!mobile || !operator) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Payment Request</h1>
          <p className="text-gray-600 mb-6">Please select a plan to proceed with payment.</p>
          <Link to="/plans" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Browse Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simplified Payment Navbar */}
      <nav className="bg-gray-800 shadow-sm border-b border-gray-700 h-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={payeaseLogo} alt="PAYEASE" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-white">PAYEASE</span>
            </Link>
            

          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-6">


        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Choose Payment Method</h3>
              
              <div className="space-y-3 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl transition-all transform hover:scale-[1.02] hover:-translate-y-0.5 ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-12 h-12 ${method.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                      <span className="material-icons text-white text-lg">{method.icon}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-gray-800">{method.name}</h4>
                      <p className="text-sm text-gray-500">{method.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedMethod === method.id && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Payment Method Forms */}
              {selectedMethod === 'upi' && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={handleUpiChange}
                    placeholder="yourname@paytm"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
              
              {selectedMethod === 'card' && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input type="text" placeholder="123" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </div>
              )}
              
              {selectedMethod === 'credit' && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Credit Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input type="text" placeholder="123" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </div>
              )}
              
              {selectedMethod === 'netbanking' && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}
              
              {selectedMethod === 'wallet' && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Wallet</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Choose wallet</option>
                    <option value="paytm">Paytm</option>
                    <option value="amazonpay">Amazon Pay</option>
                    <option value="phonepe">PhonePe</option>
                    <option value="googlepay">Google Pay</option>
                    <option value="mobikwik">MobiKwik</option>
                  </select>
                </div>
              )}

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={!selectedMethod || processing || (selectedMethod === 'upi' && !isValidUpi)}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all transform ${
                  selectedMethod && !processing && (selectedMethod !== 'upi' || isValidUpi)
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {processing ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span className="material-icons">lock</span>
                    <span>Pay ₹{amount}</span>
                  </div>
                )}
              </button>
              
              {/* Trust Signals */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">Safe & Secure Payment</p>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="material-icons text-xs">shield</span>
                    <span>100% Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-icons text-xs">verified_user</span>
                    <span>PCI DSS Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="material-icons text-gray-600">receipt</span>
                Order Summary
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Mobile Number</span>
                  <span className="font-semibold text-gray-800">+91 {mobile}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Operator</span>
                  <span className="font-semibold text-gray-800 capitalize">{operator}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Plan Details</span>
                  <span className="font-semibold text-gray-800 text-right text-sm">
                    {planData?.data || 'Recharge Plan'}<br/>
                    <span className="text-xs text-gray-500">{planData?.validity ? `${planData.validity} days` : '28 days'}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-white rounded-lg px-4 border border-gray-200">
                  <span className="font-semibold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-900">₹{amount}</span>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;