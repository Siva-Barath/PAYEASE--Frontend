import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import backgroundImage from '../assets/background-image2.jpg';
import payeaseLogo from '../assets/PAYEASE.png';

const Login = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { login, adminLogin } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      let result;
      if (showAdminLogin) {
        result = await adminLogin({ email: formData.phone, password: formData.password });
        if (result.success) {
          navigate('/admin');
        } else {
          alert(result.error);
        }
      } else {
        if (formData.phone.length !== 10) return;
        result = await login(formData);
        if (result.success) {
          navigate('/');
        } else {
          alert(result.error);
        }
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="w-full max-w-md" style={{ 
        padding: '36px 34px',
        borderRadius: '18px',
        background: 'rgba(20, 20, 25, 0.65)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mx-auto mb-4">
            <img src={payeaseLogo} alt="PAYEASE" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">{showAdminLogin ? 'Admin Login' : 'Sign in to your account'}</h1>
          <p className="text-sm text-white text-opacity-65">{showAdminLogin ? 'Admin access only' : 'Access your recharges & payments'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {showAdminLogin ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Admin Email"
                className="w-full px-4 rounded-lg outline-none text-white text-sm transition-all duration-200"
                style={{ 
                  height: '46px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                required
              />
            ) : (
              <div className="flex rounded-lg overflow-hidden transition-all duration-200" style={{ 
                height: '46px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}>
                <span className="px-3 flex items-center text-white text-opacity-70 text-sm font-medium" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRight: '1px solid rgba(255, 255, 255, 0.12)'
                }}>🇮🇳 +91</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  maxLength="10"
                  className="flex-1 px-3 outline-none text-white text-sm bg-transparent placeholder-white placeholder-opacity-50"
                  required
                />
              </div>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 rounded-lg outline-none text-white text-sm transition-all duration-200 placeholder-white placeholder-opacity-50"
              style={{ 
                height: '46px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full text-white rounded-xl font-semibold transition-all disabled:opacity-50 cursor-pointer border-none"
            style={{
              height: '48px',
              fontSize: '15px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #3b6cff, #8a4bff)',
              boxShadow: '0 12px 30px rgba(120, 100, 255, 0.45)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 16px 40px rgba(120, 100, 255, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 12px 30px rgba(120, 100, 255, 0.45)';
            }}
          >
            {loading ? 'Signing In...' : 'Continue'}
          </button>
        </form>

        <div className="text-center" style={{ marginTop: '28px', fontSize: '13px' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium hover:underline" style={{ color: '#8a4bff' }}>
              Sign up
            </Link>
          </p>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowAdminLogin(!showAdminLogin)}
              className="text-xs hover:underline"
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              {showAdminLogin ? 'User login' : 'Admin login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
