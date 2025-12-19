import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Success = () => {
  const [searchParams] = useSearchParams();
  const [showConfetti, setShowConfetti] = useState(true);
  const txnId = searchParams.get('txnId');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-12" style={{ backgroundColor: '#eef1f4' }}>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full opacity-60"></div>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-md mx-auto px-4">
        <div className="rounded-2xl text-center" style={{ 
          backgroundColor: '#f7f8fa',
          border: '1px solid #e1e4e8',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          padding: '32px'
        }}>
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{
            backgroundColor: '#22c55e',
            boxShadow: '0 0 0 6px rgba(34,197,94,0.15)'
          }}>
            <span className="material-icons text-white text-3xl">check_circle</span>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl mb-4" style={{ 
            color: '#111827',
            fontWeight: '700'
          }}>Payment Successful!</h1>
          <p className="mb-8" style={{ 
            color: '#6b7280',
            fontWeight: '400'
          }}>
            Your recharge has been completed successfully. You will receive a confirmation SMS shortly.
          </p>

          {/* Transaction Details */}
          <div className="rounded-xl p-4 mb-8 border-l-4" style={{ 
            backgroundColor: '#eceff3',
            borderLeftColor: '#22c55e'
          }}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm" style={{ 
                color: '#6b7280',
                fontWeight: '500'
              }}>Transaction ID</span>
              <span className="text-sm font-mono" style={{ 
                color: '#111827',
                fontWeight: '600'
              }}>{txnId}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm" style={{ 
                color: '#6b7280',
                fontWeight: '500'
              }}>Status</span>
              <span className="px-3 py-1 rounded-full text-xs" style={{
                backgroundColor: '#22c55e',
                color: '#ffffff',
                fontWeight: '600'
              }}>
                Completed
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ 
                color: '#6b7280',
                fontWeight: '500'
              }}>Date & Time</span>
              <span className="text-sm" style={{ 
                color: '#111827',
                fontWeight: '600'
              }}>{new Date().toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mb-8">
            <Link
              to="/"
              className="w-full text-white font-semibold transition-all block"
              style={{
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                borderRadius: '10px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Back to Home
            </Link>
            <Link
              to="/plans"
              className="w-full font-semibold transition-all block"
              style={{
                background: 'transparent',
                border: '1.5px solid #d1d5db',
                color: '#374151',
                borderRadius: '10px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Recharge Again
            </Link>
          </div>

          {/* Additional Info */}
          <div className="p-4 rounded-xl border-l-4" style={{
            backgroundColor: '#eceff3',
            borderLeftColor: '#22c55e'
          }}>
            <div className="flex items-start space-x-3">
              <span className="material-icons text-sm mt-0.5" style={{ color: '#6b7280' }}>info</span>
              <div className="text-left">
                <h3 className="text-sm mb-2" style={{ 
                  color: '#374151',
                  fontWeight: '600'
                }}>What's Next?</h3>
                <ul className="text-xs space-y-1" style={{ color: '#6b7280' }}>
                  <li>• Confirmation SMS will be sent within 2 minutes</li>
                  <li>• Plan will be activated immediately</li>
                  <li>• Check transaction history in your profile</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="mt-6 text-center">
            <p className="text-xs mb-2" style={{ color: '#9ca3af' }}>Need help?</p>
            <Link
              to="/support"
              className="text-sm font-medium hover:underline"
              style={{ color: '#6b7280' }}
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Rating Card */}
        <div className="mt-6 rounded-xl p-4 max-w-xs mx-auto" style={{
          backgroundColor: '#f1f5f9',
          border: '1px dashed #d1d5db'
        }}>
          <div className="text-center">
            <h3 className="mb-3" style={{ 
              color: '#6b7280',
              fontWeight: '500',
              fontSize: '14px'
            }}>Rate Your Experience</h3>
            <div className="flex justify-center space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="transition-colors"
                  style={{ color: '#d1d5db' }}
                >
                  <span className="material-icons" style={{ fontSize: '18px' }}>star</span>
                </button>
              ))}
            </div>
            <p className="text-xs" style={{ color: '#9ca3af' }}>Help us improve our service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;