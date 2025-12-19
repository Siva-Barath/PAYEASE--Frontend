import { useState } from 'react';

const Welcome = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-md">
        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
          <span className="text-6xl">📱</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">RechargeMax</h1>
        <p className="text-xl mb-8 opacity-90">India's fastest recharge & bill payment app</p>
        <div className="space-y-4">
          <button 
            onClick={() => onNavigate('login')}
            className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
          >
            Get Started
          </button>
          <button 
            onClick={() => onNavigate('dashboard')}
            className="w-full border-2 border-white/30 text-white py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;