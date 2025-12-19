import { useState } from 'react';

const Insurance = ({ onNavigate }) => {
  const [selectedAddons, setSelectedAddons] = useState([]);

  const addons = [
    {
      id: 'device-insurance',
      name: 'Device Insurance',
      desc: 'Protect your phone against damage, theft & liquid damage',
      price: '₹99/month',
      icon: '📱',
      features: ['Accidental damage cover', 'Theft protection', 'Liquid damage', '24/7 support']
    },
    {
      id: 'international-roaming',
      name: 'International Roaming',
      desc: 'Stay connected while traveling abroad with special rates',
      price: '₹299/month',
      icon: '✈️',
      features: ['50+ countries', 'Data + calls', 'SMS included', 'Easy activation']
    },
    {
      id: 'ott-combo',
      name: 'OTT Combo Pack',
      desc: 'Netflix + Amazon Prime + Disney+ Hotstar bundle',
      price: '₹199/month',
      icon: '📺',
      features: ['Netflix Mobile', 'Prime Video', 'Disney+ Hotstar', 'Ad-free streaming']
    },
    {
      id: 'data-booster',
      name: 'Data Booster',
      desc: 'Extra 50GB high-speed data for heavy users',
      price: '₹149/month',
      icon: '🚀',
      features: ['50GB extra data', 'High-speed 4G/5G', 'No speed throttling', 'Instant activation']
    }
  ];

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleSubscribe = () => {
    if (selectedAddons.length > 0) {
      const selectedItems = addons.filter(addon => selectedAddons.includes(addon.id));
      const total = selectedItems.reduce((sum, addon) => sum + parseInt(addon.price.replace('₹', '').replace('/month', '')), 0);
      alert(`✅ Successfully subscribed to ${selectedItems.length} add-on(s)!\n\nTotal: ₹${total}/month\n\nServices will be activated within 24 hours.`);
      setSelectedAddons([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 font-semibold">
        ← Back
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🛡️ Insurance & Add-ons</h1>
        <p className="text-gray-600">Enhance your mobile experience with premium services</p>
      </div>

      <div className="grid gap-6 mb-8">
        {addons.map(addon => (
          <div key={addon.id} className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all ${selectedAddons.includes(addon.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{addon.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{addon.name}</h3>
                  <p className="text-gray-600">{addon.desc}</p>
                  <p className="text-2xl font-bold text-blue-600 mt-2">{addon.price}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAddons.includes(addon.id)}
                  onChange={() => toggleAddon(addon.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {addon.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-green-500">✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedAddons.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 bg-white rounded-2xl shadow-2xl border-2 border-blue-500 p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="font-semibold">{selectedAddons.length} add-on(s) selected</p>
              <p className="text-sm text-gray-600">Monthly subscription</p>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              ₹{addons.filter(addon => selectedAddons.includes(addon.id)).reduce((sum, addon) => sum + parseInt(addon.price.replace('₹', '').replace('/month', '')), 0)}/month
            </p>
          </div>
          <button
            onClick={handleSubscribe}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Subscribe Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Insurance;