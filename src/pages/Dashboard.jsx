import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import api from '../services/authService';
import backgroundImage from '../assets/background-image3.jpg';

const Dashboard = () => {
  const { user } = useApp();
  const [dashboardStats, setDashboardStats] = useState({
    totalRecharges: 0,
    totalAmount: 0,
    averageRecharge: 0,
    lastRecharge: null
  });
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch recharge history from backend
      const rechargesResponse = await api.get('/recharges/my-recharges');
      const recharges = rechargesResponse.data || [];
      
      // Calculate stats from actual data
      const totalRecharges = recharges.length;
      const totalAmount = recharges.reduce((sum, r) => sum + (r.amount || 0), 0);
      const averageRecharge = totalRecharges > 0 ? Math.round(totalAmount / totalRecharges) : 0;
      const lastRecharge = recharges.length > 0 ? recharges[0] : null;
      
      setDashboardStats({
        totalRecharges,
        totalAmount,
        averageRecharge,
        lastRecharge: lastRecharge ? {
          amount: lastRecharge.amount,
          operator: lastRecharge.operator,
          date: new Date(lastRecharge.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
        } : null
      });
      
      // Format recharge history for table
      const formattedHistory = recharges.map(r => ({
        id: r._id,
        date: new Date(r.createdAt).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        operator: r.operator,
        time: new Date(r.createdAt).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        amount: r.amount,
        status: r.status || 'success'
      }));
      
      setRechargeHistory(formattedHistory);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set empty state on error
      setDashboardStats({
        totalRecharges: 0,
        totalAmount: 0,
        averageRecharge: 0,
        lastRecharge: null
      });
      setRechargeHistory([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="absolute inset-0" style={{
        background: 'rgba(15, 15, 20, 0.6)',
        backdropFilter: 'blur(2px)'
      }}></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 className="text-2xl font-semibold mb-2" style={{ color: '#ffffff' }}>Dashboard</h1>
          <p style={{ color: '#a1a1aa' }}>Overview of your recharge activity</p>
        </div>

        {/* Summary Statistics */}
        <div style={{ marginBottom: '32px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            <div style={{ padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '4px' }}>Total Recharges</div>
              <div style={{ fontSize: '22px', fontWeight: '600', color: '#ffffff' }}>{dashboardStats.totalRecharges}</div>
            </div>
            <div style={{ padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '4px' }}>Total Spent</div>
              <div style={{ fontSize: '22px', fontWeight: '600', color: '#ffffff' }}>₹{dashboardStats.totalAmount.toLocaleString()}</div>
            </div>
            <div style={{ padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '4px' }}>Average Recharge</div>
              <div style={{ fontSize: '22px', fontWeight: '600', color: '#ffffff' }}>₹{dashboardStats.averageRecharge}</div>
            </div>
            <div style={{ padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '4px' }}>Last Recharge</div>
              {dashboardStats.lastRecharge ? (
                <div style={{ fontSize: '22px', fontWeight: '600', color: '#ffffff' }}>₹{dashboardStats.lastRecharge.amount} • {dashboardStats.lastRecharge.operator}</div>
              ) : (
                <div style={{ fontSize: '22px', fontWeight: '600', color: '#ffffff' }}>No recharges yet</div>
              )}
            </div>
          </div>
        </div>

        {/* Recharge History */}
        <div>
          <h3 className="text-lg font-medium mb-4" style={{ color: '#ffffff' }}>Recharge History</h3>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            {rechargeHistory.length > 0 ? rechargeHistory.map((recharge, index) => (
              <div key={recharge.id} className="grid grid-cols-4 items-center" style={{
                padding: '14px 20px',
                borderBottom: index < rechargeHistory.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
              }}>
                <div style={{ color: '#ffffff', fontSize: '14px' }}>{recharge.date}</div>
                <div style={{ color: '#a1a1aa', fontSize: '14px' }}>{recharge.operator}</div>
                <div style={{ color: '#a1a1aa', fontSize: '14px' }}>{recharge.time}</div>
                <div className="flex items-center justify-between">
                  <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500' }}>₹{recharge.amount}</div>
                  <span style={{
                    color: recharge.status === 'success' ? '#16a34a' : '#ef4444',
                    background: recharge.status === 'success' ? 'rgba(22,163,74,0.15)' : 'rgba(239,68,68,0.1)',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '12px'
                  }}>
                    {recharge.status}
                  </span>
                </div>
              </div>
            )) : (
              <div className="text-center py-8" style={{ color: '#a1a1aa' }}>
                No recharge history found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;