import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import jioLogo from '../assets/jio.jpeg';
import airtelLogo from '../assets/airtel.png';
import viLogo from '../assets/vi.webp';
import bsnlLogo from '../assets/bsnl-logo.jpg';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import backgroundImage from '../assets/background-image.jpg';
import payeaseLogo from '../assets/PAYEASE.png';

const Home = () => {
  const { user } = useApp();
  const [currentImage, setCurrentImage] = useState(0);
  const images = [image1, image2, image3, image4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const operators = [
    { name: 'Jio', logo: jioLogo },
    { name: 'Airtel', logo: airtelLogo },
    { name: 'Vi', logo: viLogo },
    { name: 'BSNL', logo: bsnlLogo }
  ];

  const services = [
    { title: 'Mobile Recharge', icon: 'smartphone', color: 'from-emerald-600 to-emerald-700' },
    { title: 'DTH', icon: 'tv', color: 'from-teal-500 to-teal-600' },
    { title: 'Bill Payments', icon: 'receipt_long', color: 'from-orange-500 to-orange-600' },
    { title: 'Data Cards', icon: 'wifi', color: 'from-amber-500 to-amber-600' }
  ];

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Hero Section */}
      <section className="py-16">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
                {user ? `Welcome back, ${user.name}!` : 'Fast, Simple & Secure Mobile Recharge'}
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                {user ? 'Ready for your next recharge? Browse plans or check your dashboard.' : 'Recharge mobiles, pay bills, and manage utilities — fast, secure, and reliable.'}
              </p>
              <div className="flex space-x-4">
                {user ? (
                  <>
                    <Link
                      to="/plans"
                      className="bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-800"
                    >
                      Browse Plans
                    </Link>
                    <Link
                      to="/dashboard"
                      className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-800"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/plans"
                      className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-100"
                    >
                      View Plans
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            {/* Right - Image Carousel */}
            <div className="relative h-96 w-full">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-xl h-full">
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                        index === currentImage ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ display: 'block' }}
                    />
                  ))}
                </div>
                
                {/* Dot Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImage
                          ? 'bg-white shadow-lg'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operators */}
      <section className="py-8">
        <div className="px-6 max-w-7xl mx-auto">
          <h2 className="text-center text-xl font-bold text-white mb-6" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}>All Major Mobile Operators</h2>
          <div className="grid grid-cols-4 gap-6">
            {operators.map((operator, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center group cursor-pointer hover:scale-105 transition-all duration-300 h-32 flex flex-col justify-center border border-white/30 hover:border-white/50 hover:bg-white/30 shadow-xl hover:shadow-2xl">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md" style={{ aspectRatio: '1/1' }}>
                  <img 
                    src={operator.logo} 
                    alt={operator.name}
                    className="w-10 h-10 object-contain rounded-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-gray-100 transition-colors font-bold" style={{ textShadow: '0 2px 3px rgba(0,0,0,0.4)' }}>{operator.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-8 mb-16">
        <div className="px-6 max-w-7xl mx-auto">
          <h2 className="text-center text-xl font-bold text-white mb-6" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}>Our Services</h2>
          <div className="grid grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                to="/recharge"
                className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-all duration-300 text-center group h-32 flex flex-col justify-center border border-white/30 hover:border-white/50 hover:bg-white/30 shadow-xl hover:shadow-2xl"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="material-icons text-white text-xl">{service.icon}</span>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-gray-100 transition-colors font-bold" style={{ textShadow: '0 2px 3px rgba(0,0,0,0.4)' }}>{service.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-700/90 backdrop-blur-sm py-12 shadow-inner relative z-10" style={{ borderTop: '1px solid rgba(148, 163, 184, 0.3)', boxShadow: 'inset 0 1px 3px rgba(148, 163, 184, 0.1)' }}>
        <div className="px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <img src={payeaseLogo} alt="PAYEASE" className="w-10 h-10 object-contain" />
                <span className="text-2xl font-bold text-white">PAYEASE</span>
              </div>
              <p className="text-gray-300 font-medium">Fast, secure mobile recharge and bill payments</p>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors font-medium">Mobile Recharge</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-medium">Data Packs</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-medium">Bill Payments</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors font-medium">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-medium">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-medium">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 pt-6">
            <p className="text-center text-gray-400 font-medium">&copy; 2024 PAYEASE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;