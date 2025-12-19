import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jioLogo from '../assets/jio.jpeg';
import airtelLogo from '../assets/airtel.png';
import viLogo from '../assets/vi.webp';
import bsnlLogo from '../assets/bsnl-logo.jpg';
import backgroundImage from '../assets/background-image2.jpg';
import payeaseLogo from '../assets/PAYEASE.png';

const AdminDashboard = () => {
  const { admin, adminLogout, setAdmin } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [allPlans, setAllPlans] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState('Jio');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recharges, setRecharges] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlans: 0,
    totalRecharges: 0,
    totalRevenue: 0,
    recentUsers: [],
    recentRecharges: []
  });
  const [loading, setLoading] = useState(false);
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [newPlan, setNewPlan] = useState({
    operator: 'Jio',
    category: 'Popular',
    price: '',
    validity: '',
    data: '',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'prepaid',
    popular: false,
    highlight: 'Best Value',
    benefits: []
  });
  const [successMessage, setSuccessMessage] = useState('');

  const API_BASE_URL = 'http://localhost:3001/api';

  const operators = [
    { id: 'Jio', name: 'Jio', logo: jioLogo, color: 'bg-blue-600' },
    { id: 'Airtel', name: 'Airtel', logo: airtelLogo, color: 'bg-red-600' },
    { id: 'Vi', name: 'Vi', logo: viLogo, color: 'bg-purple-600' },
    { id: 'BSNL', name: 'BSNL', logo: bsnlLogo, color: 'bg-orange-600' }
  ];

  const categories = [
    { id: 'all', name: 'All Plans' },
    { id: 'popular', name: 'Popular' },
    { id: 'prepaid', name: 'Prepaid' },
    { id: 'postpaid', name: 'Postpaid' },
    { id: 'data', name: 'Data Add-On' },
    { id: 'unlimited', name: 'Truly Unlimited' },
    { id: 'validity', name: 'Validity' },
    { id: 'annual', name: 'Annual' },
    { id: 'ott', name: 'OTT Plans' },
    { id: 'talktime', name: 'Talktime' }
  ];



  useEffect(() => {
    const savedAdmin = localStorage.getItem('admin');
    const adminToken = localStorage.getItem('adminToken');
    
    if (!admin && savedAdmin && adminToken) {
      // Restore admin from localStorage
      setAdmin(JSON.parse(savedAdmin));
    } else if (!admin && !savedAdmin && !adminToken) {
      navigate('/login');
      return;
    }
    
    fetchUsers();
    fetchPlans();
    fetchRecharges();
    fetchStats();
    setTimeout(loadAllPlans, 100);
  }, [admin, navigate, setAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFallbackPlans = () => [
    {
      _id: 'fallback_1',
      operator: 'Jio',
      category: 'Popular',
      price: 299,
      validity: '28',
      data: '2GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      popular: true,
      highlight: 'Best Value',
      benefits: ['Disney+ Hotstar'],
      createdAt: new Date().toISOString()
    },
    {
      _id: 'fallback_2',
      operator: 'Airtel',
      category: 'Unlimited',
      price: 399,
      validity: '28',
      data: '2.5GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      popular: false,
      highlight: 'Long Validity',
      benefits: ['Netflix', 'Amazon Prime'],
      createdAt: new Date().toISOString()
    },
    {
      _id: 'fallback_3',
      operator: 'Vi',
      category: 'Data Packs',
      price: 199,
      validity: '28',
      data: '1.5GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      popular: false,
      highlight: 'Affordable',
      benefits: ['Vi Movies & TV'],
      createdAt: new Date().toISOString()
    },
    {
      _id: 'fallback_4',
      operator: 'BSNL',
      category: 'Annual',
      price: 1999,
      validity: '365',
      data: '2GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      popular: false,
      highlight: 'Long Term',
      benefits: ['BSNL Tunes'],
      createdAt: new Date().toISOString()
    }
  ];

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/plans`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPlans(data.length > 0 ? data : getFallbackPlans());
      } else {
        console.log('Backend plans API failed, using fallback');
        setPlans(getFallbackPlans());
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      console.log('Using fallback plans');
      setPlans(getFallbackPlans());
    } finally {
      setLoading(false);
    }
  };

  const loadAllPlans = () => {
    const backendPlans = plans.map(plan => ({
      ...plan,
      id: plan._id,
      ott: plan.benefits || [],
      isPopular: plan.popular,
      isBackend: true
    }));

    setAllPlans(backendPlans);
  };

  const getCurrentPlans = () => {
    let filtered = allPlans.filter(plan => plan.operator === selectedOperator);
    
    if (selectedCategory === 'popular') {
      filtered = filtered.filter(plan => plan.popular || plan.isPopular);
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(plan => plan.category === selectedCategory);
    }
    
    return filtered;
  };

  const getAvailableCategories = () => {
    const operatorPlans = allPlans.filter(plan => plan.operator === selectedOperator);
    const available = [{ id: 'all', name: 'All Plans' }];
    
    if (operatorPlans.some(plan => plan.popular || plan.isPopular)) {
      available.push({ id: 'popular', name: 'Popular' });
    }
    
    const availableCategories = [...new Set(operatorPlans.map(plan => plan.category))];
    availableCategories.forEach(cat => {
      const categoryObj = categories.find(c => c.id === cat);
      if (categoryObj && !available.find(a => a.id === cat)) {
        available.push(categoryObj);
      }
    });
    
    return available;
  };

  useEffect(() => {
    if (plans.length > 0) {
      loadAllPlans();
    }
  }, [plans]);

  const fetchRecharges = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/recharges`);
      if (response.ok) {
        const data = await response.json();
        
        // Also get guest recharges from localStorage as fallback
        const guestRecharges = JSON.parse(localStorage.getItem('guestRecharges') || '[]');
        
        // Combine backend and guest recharges
        const allRecharges = [...data, ...guestRecharges];
        setRecharges(allRecharges);
      } else {
        // If backend fails, show only guest recharges
        const guestRecharges = JSON.parse(localStorage.getItem('guestRecharges') || '[]');
        setRecharges(guestRecharges);
      }
    } catch (error) {
      console.error('Error fetching recharges:', error);
      // If backend fails, show only guest recharges
      const guestRecharges = JSON.parse(localStorage.getItem('guestRecharges') || '[]');
      setRecharges(guestRecharges);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();
    try {
      const planData = {
        ...newPlan,
        _id: 'plan_' + Date.now(),
        price: Number(newPlan.price),
        benefits: newPlan.benefits.filter(b => b.trim() !== ''),
        createdAt: new Date().toISOString()
      };
      
      // Try backend first
      try {
        const response = await fetch(`${API_BASE_URL}/admin/plans`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          },
          body: JSON.stringify(planData)
        });
        
        if (response.ok) {
          fetchPlans();
        } else {
          throw new Error('Backend failed');
        }
      } catch (backendError) {
        // If backend fails, add to local plans and localStorage
        setPlans(prevPlans => {
          const newPlans = [...prevPlans, planData];
          localStorage.setItem('adminPlans', JSON.stringify(newPlans));
          return newPlans;
        });
      }
      
      setShowAddPlan(false);
      setNewPlan({
        operator: 'Jio',
        category: 'Popular',
        price: '',
        validity: '',
        data: '',
        calls: 'Unlimited',
        sms: '100/day',
        type: 'prepaid',
        popular: false,
        highlight: 'Best Value',
        benefits: []
      });
      setSuccessMessage('Plan added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding plan:', error);
      setSuccessMessage('Error adding plan');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        // Try backend first
        try {
          const response = await fetch(`${API_BASE_URL}/admin/plans/${planId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          
          if (response.ok) {
            fetchPlans();
          } else {
            throw new Error('Backend failed');
          }
        } catch (backendError) {
          // If backend fails, remove from local plans
          setPlans(prevPlans => prevPlans.filter(plan => plan._id !== planId));
        }
        
        setSuccessMessage('Plan deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting plan:', error);
        setSuccessMessage('Error deleting plan');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    }
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setNewPlan({
      operator: plan.operator,
      category: plan.category,
      price: plan.price.toString(),
      validity: plan.validity,
      data: plan.data,
      calls: plan.calls,
      sms: plan.sms,
      type: plan.type,
      popular: plan.popular || plan.isPopular,
      highlight: plan.highlight,
      benefits: plan.benefits || []
    });
    setShowEditPlan(true);
  };

  const handleUpdatePlan = async (e) => {
    e.preventDefault();
    try {
      const planData = {
        ...newPlan,
        price: Number(newPlan.price),
        benefits: newPlan.benefits.filter(b => b.trim() !== '')
      };
      
      // Try backend first
      try {
        const response = await fetch(`${API_BASE_URL}/admin/plans/${editingPlan._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          },
          body: JSON.stringify(planData)
        });
        
        if (response.ok) {
          fetchPlans();
        } else {
          throw new Error('Backend failed');
        }
      } catch (backendError) {
        // If backend fails, update local plans
        setPlans(prevPlans => prevPlans.map(plan => 
          plan._id === editingPlan._id ? { ...plan, ...planData } : plan
        ));
      }
      
      setShowEditPlan(false);
      setEditingPlan(null);
      setNewPlan({
        operator: 'Jio',
        category: 'Popular',
        price: '',
        validity: '',
        data: '',
        calls: 'Unlimited',
        sms: '100/day',
        type: 'prepaid',
        popular: false,
        highlight: 'Best Value',
        benefits: []
      });
      setSuccessMessage('Plan updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating plan:', error);
      setSuccessMessage('Error updating plan');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/login');
  };

  const addBenefit = () => {
    setNewPlan(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const updateBenefit = (index, value) => {
    setNewPlan(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit)
    }));
  };

  const removeBenefit = (index) => {
    setNewPlan(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const savedAdmin = localStorage.getItem('admin');
  const adminToken = localStorage.getItem('adminToken');
  
  if (!admin && !savedAdmin && !adminToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ 
      background: activeTab === 'plans' 
        ? `linear-gradient(rgba(10, 15, 25, 0.85), rgba(10, 15, 25, 0.85)), url(${backgroundImage})` 
        : '#1F2933',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      {/* Header */}
      <div style={{ background: '#27313C', borderBottom: '1px solid #3B4754' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={payeaseLogo} alt="PAYEASE" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#F8FAFC' }}>PAYEASE Admin</h1>
                <p className="text-sm" style={{ color: '#CBD5E1' }}>Administrator Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.open('/', '_blank')}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                View Site
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ background: '#27313C', borderBottom: '1px solid #3B4754' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-6">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
              { id: 'users', name: 'Users', icon: 'people' },
              { id: 'recharges', name: 'Recharges', icon: 'credit_card' },
              { id: 'plans', name: 'Plans', icon: 'list_alt' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center space-x-2 px-4 py-4 font-medium text-sm transition-all duration-200 border-b-2 hover:transform hover:-translate-y-0.5"
                style={{
                  borderBottomColor: activeTab === tab.id ? '#4F7CFF' : 'transparent',
                  color: activeTab === tab.id ? '#4F7CFF' : 'rgba(255, 255, 255, 0.65)',
                  height: '44px'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.color = 'rgba(255, 255, 255, 0.85)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.color = 'rgba(255, 255, 255, 0.65)';
                  }
                }}
              >
                <span className="material-icons text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="rounded-2xl p-6" style={{ background: '#2E3945', border: '1px solid #3B4754' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold" style={{ color: '#F8FAFC' }}>Total Users</h3>
                  <span className="material-icons" style={{ color: '#4F7CFF', opacity: 0.7, fontSize: '24px' }}>people</span>
                </div>
                <div className="text-3xl font-bold" style={{ color: '#F8FAFC' }}>{users.length}</div>
                <p className="text-sm mt-2" style={{ color: '#CBD5E1' }}>Registered users</p>
              </div>

              <div className="rounded-2xl p-6" style={{ background: '#2E3945', border: '1px solid #3B4754' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold" style={{ color: '#F8FAFC' }}>Total Recharges</h3>
                  <span className="material-icons" style={{ color: '#4F7CFF', opacity: 0.7, fontSize: '24px' }}>credit_card</span>
                </div>
                <div className="text-3xl font-bold" style={{ color: '#F8FAFC' }}>{recharges.length}</div>
                <p className="text-sm mt-2" style={{ color: '#CBD5E1' }}>All time recharges</p>
              </div>

              <div className="rounded-2xl p-6" style={{ background: '#2E3945', border: '1px solid #3B4754' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold" style={{ color: '#F8FAFC' }}>Total Revenue</h3>
                  <span className="material-icons" style={{ color: '#4F7CFF', opacity: 0.7, fontSize: '24px' }}>account_balance_wallet</span>
                </div>
                <div className="text-3xl font-bold" style={{ color: '#F8FAFC' }}>₹{recharges.reduce((sum, r) => sum + (r.amount || 0), 0).toLocaleString()}</div>
                <p className="text-sm mt-2" style={{ color: '#CBD5E1' }}>Total earnings</p>
              </div>

              <div className="rounded-2xl p-6" style={{ background: '#2E3945', border: '1px solid #3B4754' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold" style={{ color: '#F8FAFC' }}>Success Rate</h3>
                  <span className="material-icons" style={{ color: '#4F7CFF', opacity: 0.7, fontSize: '24px' }}>trending_up</span>
                </div>
                <div className="text-3xl font-bold" style={{ color: '#F8FAFC' }}>{recharges.length > 0 ? Math.round((recharges.filter(r => r.status === 'success').length / recharges.length) * 100) : 0}%</div>
                <p className="text-sm mt-2" style={{ color: '#CBD5E1' }}>Transaction success</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl" style={{ background: '#2E3945', border: '1px solid #3B4754' }}>
              <div className="p-6" style={{ borderBottom: '1px solid #3B4754' }}>
                <h2 className="text-xl font-semibold" style={{ color: '#F8FAFC' }}>Recent Activity</h2>
                <p className="mt-1" style={{ color: '#CBD5E1' }}>Latest user registrations and recharges</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recharges.slice(0, 5).map((recharge) => (
                    <div key={recharge._id} className="flex items-center justify-between p-4 rounded-lg" style={{ background: '#374151' }}>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(79, 124, 255, 0.1)' }}>
                          <span className="material-icons" style={{ color: '#4F7CFF', fontSize: '18px' }}>credit_card</span>
                        </div>
                        <div>
                          <p className="font-medium" style={{ color: '#F8FAFC' }}>₹{recharge.amount} Recharge</p>
                          <p className="text-sm" style={{ color: '#CBD5E1' }}>{recharge.phoneNumber} • {recharge.operator}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          recharge.status === 'success' ? 'bg-green-100 text-green-800' :
                          recharge.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {recharge.status}
                        </span>
                        <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>{new Date(recharge.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold" style={{ color: '#F8FAFC' }}>User Management</h2>
                <p className="mt-1" style={{ color: '#CBD5E1' }}>Manage registered users • {users.length} total users</p>
              </div>
            </div>

            <div className="rounded-2xl" style={{ background: '#2E3945', border: '1px solid #3B4754' }}>
              <div className="p-6" style={{ borderBottom: '1px solid #3B4754' }}>
                <h3 className="text-lg font-semibold" style={{ color: '#F8FAFC' }}>All Users</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ background: '#374151' }}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#D1D5DB' }}>User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#D1D5DB' }}>Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#D1D5DB' }}>Wallet</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#D1D5DB' }}>Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#D1D5DB' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ background: '#2E3945', borderColor: '#3B4754' }}>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">{user.name?.charAt(0)?.toUpperCase()}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium" style={{ color: '#F8FAFC' }}>{user.name}</div>
                              <div className="text-sm" style={{ color: '#9CA3AF' }}>ID: {user._id.slice(-6)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm" style={{ color: '#F8FAFC' }}>{user.email}</div>
                          <div className="text-sm" style={{ color: '#9CA3AF' }}>{user.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium" style={{ color: '#F8FAFC' }}>₹{user.walletBalance || 0}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#9CA3AF' }}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recharges' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold" style={{ color: '#F8FAFC' }}>Recharge Management</h2>
                <p className="mt-1" style={{ color: '#CBD5E1' }}>All recharge transactions • {recharges.length} total recharges</p>
              </div>
            </div>

            <div className="rounded-2xl" style={{ background: '#2E3945', border: '1px solid #3B4754' }}>
              <div className="p-6" style={{ borderBottom: '1px solid #3B4754' }}>
                <h3 className="text-lg font-semibold" style={{ color: '#F8FAFC' }}>All Transactions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ background: '#374151' }}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#D1D5DB' }}>Transaction</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#D1D5DB' }}>User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#D1D5DB' }}>Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#D1D5DB' }}>Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#D1D5DB' }}>Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#D1D5DB' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ background: '#2E3945', borderColor: '#3B4754' }}>
                    {recharges.map((recharge) => (
                      <tr key={recharge._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium" style={{ color: '#F8FAFC' }}>#{recharge.transactionId || recharge._id.slice(-6)}</div>
                          <div className="text-sm" style={{ color: '#9CA3AF' }}>{recharge.paymentMethod || 'Wallet'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm" style={{ color: '#F8FAFC' }}>{recharge.userId?.name || (recharge.isGuest ? 'Guest User' : 'Unknown')}</div>
                          <div className="text-sm" style={{ color: '#9CA3AF' }}>{recharge.userId?.email || (recharge.isGuest ? 'Guest Transaction' : 'N/A')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm" style={{ color: '#F8FAFC' }}>{recharge.phoneNumber}</div>
                          <div className="text-sm" style={{ color: '#9CA3AF' }}>{recharge.operator}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium" style={{ color: '#F8FAFC' }}>₹{recharge.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            recharge.status === 'success' ? 'bg-green-100 text-green-800' :
                            recharge.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {recharge.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#9CA3AF' }}>
                          {new Date(recharge.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="min-h-screen" style={{ 
            margin: '-2rem -1.5rem',
            padding: '2rem 1.5rem'
          }}>
            {/* Hero Section */}
            <div className="px-6 py-8">
              <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>
                  Manage Plans
                </h1>
                <p className="text-base mb-4" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                  Add, edit, or remove recharge plans • {allPlans.length} total plans
                </p>
                <button
                  onClick={() => setShowAddPlan(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
                >
                  Add New Plan
                </button>
                
                {/* Success Message */}
                {successMessage && (
                  <div className="mt-4 p-3 rounded-lg text-center font-medium" style={{
                    background: successMessage.includes('Error') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                    color: successMessage.includes('Error') ? '#EF4444' : '#22C55E',
                    border: `1px solid ${successMessage.includes('Error') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)'}`
                  }}>
                    {successMessage}
                  </div>
                )}
              </div>
            </div>

            {/* Filters Section */}
            <div className="px-6 pb-6">
              <div className="max-w-6xl mx-auto">
                <div className="p-6 rounded-2xl" style={{ 
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  {/* Row 1: Select Operator */}
                  <div className="mb-4">
                    <h3 className="text-base font-semibold mb-4" style={{ color: '#ffffff' }}>Select Operator</h3>
                    <div className="flex justify-center gap-16 mb-4">
                      {operators.map((operator) => (
                        <button
                          key={operator.id}
                          onClick={() => setSelectedOperator(operator.id)}
                          className="flex flex-col items-center transition-all duration-300"
                          style={{ width: '72px', textAlign: 'center' }}
                        >
                          <img 
                            src={operator.logo} 
                            alt={operator.name} 
                            style={{
                              width: '56px',
                              height: '56px',
                              borderRadius: '50%',
                              objectFit: 'contain',
                              background: '#fff',
                              padding: '6px',
                              border: selectedOperator === operator.id 
                                ? '2px solid #6366f1' 
                                : '2px solid rgba(255,255,255,0.1)',
                              boxShadow: selectedOperator === operator.id 
                                ? '0 0 12px rgba(99, 102, 241, 0.4)' 
                                : 'none'
                            }}
                          />
                          <span 
                            style={{ 
                              fontSize: '12px',
                              fontWeight: '500',
                              color: selectedOperator === operator.id ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                              marginTop: '6px'
                            }}
                          >
                            {operator.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ 
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
                    margin: '16px 0'
                  }}></div>

                  {/* Row 2: Categories */}
                  <div>
                    <h3 className="text-base font-semibold mb-4" style={{ color: '#ffffff' }}>Categories</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {getAvailableCategories().map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className="transition-all duration-300 rounded-full"
                          style={{
                            height: '38px',
                            padding: '0 18px',
                            fontSize: '13px',
                            fontWeight: '500',
                            background: selectedCategory === category.id 
                              ? 'linear-gradient(135deg, #6366f1, #4f46e5)' 
                              : 'rgba(255,255,255,0.05)',
                            color: selectedCategory === category.id ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                            border: 'none'
                          }}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Divider */}
            <div style={{ 
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
              margin: '24px 0'
            }}></div>

            {/* Plans Section */}
            <div className="px-6 py-8">
              <div className="max-w-6xl mx-auto">
                {allPlans.filter(plan => plan.operator === selectedOperator && (selectedCategory === 'all' || (selectedCategory === 'popular' && (plan.popular || plan.isPopular)) || plan.category === selectedCategory)).length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mb-2" style={{ color: '#ffffff' }}>No plans available for this category</div>
                    <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Try selecting a different category</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allPlans.filter(plan => plan.operator === selectedOperator && (selectedCategory === 'all' || (selectedCategory === 'popular' && (plan.popular || plan.isPopular)) || plan.category === selectedCategory)).map((plan) => (
                      <div 
                        key={plan.id || plan._id} 
                        className="relative rounded-2xl p-6 transition-all duration-300 hover:scale-105 group flex flex-col h-80"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.04)',
                          backdropFilter: 'blur(14px)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '16px',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #6366F1/20, #4F46E5/20)' }}></div>
                        
                        {/* Admin Actions */}
                        {plan.isBackend && (
                          <div className="absolute top-4 right-4 flex gap-2 z-20">
                            <button
                              onClick={() => handleEditPlan(plan)}
                              className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                              title="Edit Plan"
                            >
                              <span className="material-icons text-white text-sm">edit</span>
                            </button>
                            <button
                              onClick={() => handleDeletePlan(plan._id)}
                              className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                              title="Delete Plan"
                            >
                              <span className="material-icons text-white text-sm">delete</span>
                            </button>
                          </div>
                        )}

                        {/* Price & Validity */}
                        <div className="mb-4 relative z-10">
                          <div className="text-3xl font-bold mb-1" style={{ color: '#F8FAFC', fontWeight: '700' }}>₹{plan.price}</div>
                          <div style={{ color: '#CBD5E1' }}>{plan.validity} Days Validity</div>
                          {!plan.isBackend && <span className="text-xs px-2 py-1 rounded-full mt-2 inline-block" style={{ background: '#374151', color: '#9CA3AF' }}>Static</span>}
                        </div>

                        {/* Plan Features */}
                        <div className="mb-4 relative z-10" style={{ color: '#CBD5E1' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="material-icons text-sm" style={{ color: '#22C55E' }}>data_usage</span>
                            <span>{plan.data}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="material-icons text-sm" style={{ color: '#22C55E' }}>call</span>
                            <span>{plan.calls}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="material-icons text-sm" style={{ color: '#22C55E' }}>sms</span>
                            <span>{plan.sms}</span>
                          </div>
                        </div>

                        {/* OTT Benefits - Fixed Height */}
                        <div className="h-12 mb-4 relative z-10 flex-grow">
                          {(plan.benefits || plan.ott)?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {(plan.benefits || plan.ott || []).map((benefit, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 rounded-full text-xs font-semibold"
                                  style={{ background: '#6366F1', color: '#F8FAFC' }}
                                >
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="h-full"></div>
                          )}
                        </div>

                        {/* Plan Status */}
                        <div className="mt-auto pt-3 flex justify-between items-center relative z-10" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                          <div className="flex gap-2">
                            {(plan.popular || plan.isPopular) && (
                              <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: '#22C55E', color: '#052E16' }}>
                                ⭐ Popular
                              </span>
                            )}
                            <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#CBD5E1' }}>
                              {plan.category || 'prepaid'}
                            </span>
                          </div>
                          {plan.createdAt && (
                            <div className="text-xs" style={{ color: '#94A3B8' }}>
                              {new Date(plan.createdAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Plan Modal */}
      {showAddPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Add New Plan</h3>
              <button onClick={() => setShowAddPlan(false)} className="text-gray-500 hover:text-gray-700">
                <span className="material-icons">close</span>
              </button>
            </div>
            <form onSubmit={handleAddPlan} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operator</label>
                  <select value={newPlan.operator} onChange={(e) => setNewPlan({...newPlan, operator: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Jio">Jio</option>
                    <option value="Airtel">Airtel</option>
                    <option value="Vi">Vi</option>
                    <option value="BSNL">BSNL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select value={newPlan.category} onChange={(e) => setNewPlan({...newPlan, category: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Popular">Popular</option>
                    <option value="Unlimited">Unlimited</option>
                    <option value="Data Packs">Data Packs</option>
                    <option value="Annual">Annual</option>
                    <option value="Talktime">Talktime</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input type="number" value={newPlan.price} onChange={(e) => setNewPlan({...newPlan, price: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="299" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Validity (days)</label>
                  <input type="text" value={newPlan.validity} onChange={(e) => setNewPlan({...newPlan, validity: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="28" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                <input type="text" value={newPlan.data} onChange={(e) => setNewPlan({...newPlan, data: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="2GB/day" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Calls</label>
                  <input type="text" value={newPlan.calls} onChange={(e) => setNewPlan({...newPlan, calls: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Unlimited" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMS</label>
                  <input type="text" value={newPlan.sms} onChange={(e) => setNewPlan({...newPlan, sms: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="100/day" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                <div className="space-y-2">
                  {newPlan.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={benefit} onChange={(e) => updateBenefit(index, e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Disney+ Hotstar" />
                      <button type="button" onClick={() => removeBenefit(index)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        <span className="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addBenefit} className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600">
                    + Add Benefit
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" checked={newPlan.popular} onChange={(e) => setNewPlan({...newPlan, popular: e.target.checked})} className="mr-2" />
                  <span className="text-sm text-gray-700">Popular Plan</span>
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowAddPlan(false)} className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Add Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {showEditPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Edit Plan</h3>
              <button onClick={() => setShowEditPlan(false)} className="text-gray-500 hover:text-gray-700">
                <span className="material-icons">close</span>
              </button>
            </div>
            <form onSubmit={handleUpdatePlan} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operator</label>
                  <select value={newPlan.operator} onChange={(e) => setNewPlan({...newPlan, operator: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Jio">Jio</option>
                    <option value="Airtel">Airtel</option>
                    <option value="Vi">Vi</option>
                    <option value="BSNL">BSNL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select value={newPlan.category} onChange={(e) => setNewPlan({...newPlan, category: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Popular">Popular</option>
                    <option value="Unlimited">Unlimited</option>
                    <option value="Data Packs">Data Packs</option>
                    <option value="Annual">Annual</option>
                    <option value="Talktime">Talktime</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input type="number" value={newPlan.price} onChange={(e) => setNewPlan({...newPlan, price: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="299" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Validity (days)</label>
                  <input type="text" value={newPlan.validity} onChange={(e) => setNewPlan({...newPlan, validity: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="28" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                <input type="text" value={newPlan.data} onChange={(e) => setNewPlan({...newPlan, data: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="2GB/day" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Calls</label>
                  <input type="text" value={newPlan.calls} onChange={(e) => setNewPlan({...newPlan, calls: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Unlimited" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMS</label>
                  <input type="text" value={newPlan.sms} onChange={(e) => setNewPlan({...newPlan, sms: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="100/day" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                <div className="space-y-2">
                  {newPlan.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={benefit} onChange={(e) => updateBenefit(index, e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Disney+ Hotstar" />
                      <button type="button" onClick={() => removeBenefit(index)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        <span className="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addBenefit} className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600">
                    + Add Benefit
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" checked={newPlan.popular} onChange={(e) => setNewPlan({...newPlan, popular: e.target.checked})} className="mr-2" />
                  <span className="text-sm text-gray-700">Popular Plan</span>
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowEditPlan(false)} className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Update Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;