import { useState } from 'react';

const QRScanner = ({ onNavigate }) => {
  const [scanResult, setScanResult] = useState(null);
  const [amount, setAmount] = useState('');

  const handleScanDemo = () => {
    // Simulate QR scan result
    const demoResult = {
      type: 'UPI',
      id: 'merchant@paytm',
      name: 'Demo Merchant',
      amount: '299'
    };
    setScanResult(demoResult);
    setAmount(demoResult.amount);
  };

  const handlePayment = () => {
    if (scanResult && amount) {
      alert(`✅ Payment of ₹${amount} initiated!\n\nTo: ${scanResult.name}\nUPI ID: ${scanResult.id}\n\nRedirecting to UPI app...`);
      setScanResult(null);
      setAmount('');
      onNavigate('dashboard');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 font-semibold">
        ← Back
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📱 QR Scanner</h1>
        <p className="text-gray-600">Scan QR codes for quick payments</p>
      </div>

      {!scanResult ? (
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 text-center">
          <div className="w-64 h-64 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center border-4 border-dashed border-gray-300">
            <div className="text-center">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-gray-500">Position QR code within frame</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleScanDemo}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
            >
              📸 Start Scanning (Demo)
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 p-4 border-2 border-gray-300 rounded-xl hover:border-blue-500 transition-all">
                <span>💡</span>
                <span className="font-semibold">Flash</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-4 border-2 border-gray-300 rounded-xl hover:border-blue-500 transition-all">
                <span>🖼️</span>
                <span className="font-semibold">Gallery</span>
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <h3 className="font-bold text-blue-800 mb-2">💡 Tips for better scanning:</h3>
            <ul className="text-sm text-blue-700 space-y-1 text-left">
              <li>• Hold phone steady and ensure good lighting</li>
              <li>• Keep QR code within the frame</li>
              <li>• Clean your camera lens for better clarity</li>
              <li>• Avoid shadows on the QR code</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">QR Code Scanned!</h2>
            <p className="text-gray-600">Review payment details below</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏪</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{scanResult.name}</h3>
                <p className="text-gray-600">{scanResult.id}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-semibold">{scanResult.type}</span>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-2xl font-bold text-center focus:border-blue-500 outline-none"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setScanResult(null)}
              className="flex-1 border-2 border-gray-300 py-3 rounded-xl font-semibold hover:border-gray-400 transition-all"
            >
              Scan Again
            </button>
            <button
              onClick={handlePayment}
              disabled={!amount}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              Pay ₹{amount}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScanner;