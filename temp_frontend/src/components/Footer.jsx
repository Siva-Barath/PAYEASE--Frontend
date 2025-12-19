const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-lg">flash_on</span>
              </div>
              <span className="text-xl font-bold">Topify</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for instant mobile recharge and bill payments. 
              Fast, secure, and reliable service 24/7.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Mobile Recharge</li>
              <li>DTH Recharge</li>
              <li>Bill Payments</li>
              <li>Data Cards</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Transaction Status</li>
              <li>Refund Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="material-icons text-xs">phone</span>
                <span>1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-icons text-xs">email</span>
                <span>support@topify.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-icons text-xs">schedule</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Topify. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;