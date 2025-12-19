import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AdminProtectedRoute = ({ children }) => {
  const { admin } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const savedAdmin = localStorage.getItem('admin');
    const adminToken = localStorage.getItem('adminToken');
    
    if (!admin && !savedAdmin && !adminToken) {
      navigate('/login');
    }
  }, [admin, navigate]);

  // Show loading while checking authentication
  const savedAdmin = localStorage.getItem('admin');
  const adminToken = localStorage.getItem('adminToken');
  
  if (!admin && !savedAdmin && !adminToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Checking authentication...</div>
      </div>
    );
  }

  return children;
};

export default AdminProtectedRoute;