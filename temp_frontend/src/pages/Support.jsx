const Support = () => {
  const faqItems = [
    { q: 'How to recharge my mobile?', a: 'Enter your mobile number, select operator, choose plan, and pay.' },
    { q: 'Is my payment secure?', a: 'Yes, all payments are secured with 256-bit encryption.' },
    { q: 'How to check transaction status?', a: 'Go to Transaction History to view all your transactions.' },
    { q: 'Can I get refund?', a: 'Refunds are processed within 5-7 business days for failed transactions.' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Help & Support</h1>
        <p className="text-gray-600 mt-1">Get help with your recharge and payments</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
          <span className="material-icons text-4xl text-blue-600 mb-4">call</span>
          <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
          <p className="text-gray-600 mb-4">24/7 Customer Support</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">
            Call Now
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
          <span className="material-icons text-4xl text-green-600 mb-4">chat</span>
          <h3 className="font-semibold text-gray-800 mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">Chat with our experts</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold">
            Start Chat
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Frequently Asked Questions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {faqItems.map((item, index) => (
            <div key={index} className="p-6">
              <h4 className="font-semibold text-gray-800 mb-2">{item.q}</h4>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;