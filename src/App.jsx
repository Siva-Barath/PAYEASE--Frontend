import { BrowserRouter, Routes, Route, useLocation, useEffect } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Dashboard from './pages/Dashboard';
import RechargeType from './pages/RechargeType';
import MobileInput from './pages/MobileInput';
import Plans from './pages/Plans';
import PaymentPage from './pages/PaymentPage';
import Success from './pages/Success';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Handle SPA rewrite URLs - check if this is a payment URL that was rewritten
  const urlParams = new URLSearchParams(location.search);
  const hasPaymentParams = urlParams.has('mobile') && urlParams.has('operator') && urlParams.has('amount');
  const isPaymentRoute = (location.pathname === '/' || location.pathname === '/index.html') && hasPaymentParams;

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={isPaymentRoute ? <PaymentPage /> : <Home />} />
          <Route path="/index.html" element={isPaymentRoute ? <PaymentPage /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/recharge" element={<ProtectedRoute><RechargeType /></ProtectedRoute>} />
          <Route path="/recharge/mobile" element={<ProtectedRoute><MobileInput /></ProtectedRoute>} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;