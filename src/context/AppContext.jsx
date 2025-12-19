import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import axios from 'axios';
import API_CONFIG from '../config/api';

const AppContext = createContext();

const API_BASE_URL = API_CONFIG.BASE_URL;

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Check for existing token on app load
  useEffect(() => {
    const token = authService.getToken();
    const savedUser = authService.getCurrentUser();
    const savedAdmin = localStorage.getItem('admin');
    
    if (token && savedUser) {
      setUser(savedUser);
      fetchUserTransactions();
    }
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
    setLoading(false);
  }, []);

  const fetchUserTransactions = async () => {
    try {
      const token = authService.getToken();
      if (token) {
        const response = await axios.get(`${API_BASE_URL}/recharges/my-recharges`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(response.data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const login = async (credentials) => {
    try {
      const { user } = await authService.login(credentials);
      setUser(user);
      fetchUserTransactions();
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const adminLogin = async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/login`, credentials);
      const { admin, token } = response.data;
      localStorage.setItem('adminToken', token);
      localStorage.setItem('admin', JSON.stringify(admin));
      setAdmin(admin);
      return { success: true, admin };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Admin login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const { user } = await authService.register(userData);
      setUser(user);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setSelectedOperator('');
    setSelectedPlan(null);
    setTransactions([]);
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    setAdmin(null);
  };

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  return (
    <AppContext.Provider value={{
      user, setUser, login, register, logout, loading,
      admin, setAdmin, adminLogin, adminLogout,
      selectedOperator, setSelectedOperator,
      selectedPlan, setSelectedPlan,
      transactions, addTransaction, fetchUserTransactions,
      isAuthenticated: authService.isAuthenticated
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
