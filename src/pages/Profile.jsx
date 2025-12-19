import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { authService } from '../services/authService';
import backgroundImage from '../assets/background-image3.jpg';

const Profile = () => {
  const { user, setUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    phone: user?.phone || '',
    preferredOperator: 'Jio'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleEdit = () => {
    setEditData({
      phone: user.phone,
      preferredOperator: 'Jio'
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      phone: user.phone,
      preferredOperator: 'Jio'
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedUser = await authService.updateProfile(editData);
      setUser(updatedUser);
      setIsEditing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen relative flex items-center justify-center py-8" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0" style={{
          background: 'rgba(15, 15, 20, 0.6)',
          backdropFilter: 'blur(2px)'
        }}></div>
        <div className="max-w-md mx-auto px-4">
          <div className="relative z-10 text-center" style={{
            background: 'rgba(20, 24, 32, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            padding: '32px'
          }}>
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-icons text-gray-300 text-2xl">person_off</span>
            </div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: '#EAEAEA' }}>Not Logged In</h2>
            <p className="mb-6" style={{ color: '#B0B0B0' }}>Please log in to view your profile</p>
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative py-8" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="absolute inset-0" style={{
        background: 'rgba(15, 15, 20, 0.6)',
        backdropFilter: 'blur(2px)'
      }}></div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
        {/* Profile Header */}
        <div style={{
          background: 'rgba(20, 24, 32, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          padding: '24px'
        }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="material-icons text-white text-2xl">person</span>
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: '#EAEAEA' }}>{user.name || 'User'}</h1>
                <p className="mb-2" style={{ color: '#B0B0B0' }}>{user.email || `+91 ${user.phone}`}</p>
                <div className="flex items-center space-x-3">
                  <span style={{
                    background: 'rgba(34, 197, 94, 0.2)',
                    color: '#22c55e',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    ✓ Verified
                  </span>
                  <span className="text-sm" style={{ color: '#9CA3AF' }}>
                    Member since 2024
                  </span>
                </div>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors hover:bg-blue-600"
                style={{ background: 'rgba(59, 130, 246, 0.8)', color: '#EAEAEA' }}
              >
                <span className="material-icons text-sm">edit</span>
                <span className="font-medium">Edit Profile</span>
              </button>
            )}
          </div>

          {/* Editable Fields */}
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2" style={{ 
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              ...(isEditing && { background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', padding: '12px' })
            }}>
              <span style={{ color: '#B0B0B0' }}>Mobile Number</span>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  className="bg-transparent border border-gray-600 rounded px-3 py-1 text-right font-medium focus:border-blue-500 focus:outline-none"
                  style={{ color: '#EAEAEA', width: '140px' }}
                  placeholder="Phone number"
                />
              ) : (
                <span className="font-medium" style={{ color: '#EAEAEA' }}>+91 {user.phone}</span>
              )}
            </div>
            <div className="flex justify-between items-center py-2" style={{ 
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <span style={{ color: '#B0B0B0' }}>Email Address</span>
              <span className="font-medium" style={{ color: '#EAEAEA' }}>{user.email || 'Not provided'}</span>
            </div>
            <div className="flex justify-between items-center py-2" style={{ 
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              ...(isEditing && { background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', padding: '12px' })
            }}>
              <span style={{ color: '#B0B0B0' }}>Preferred Operator</span>
              {isEditing ? (
                <select
                  value={editData.preferredOperator}
                  onChange={(e) => setEditData({...editData, preferredOperator: e.target.value})}
                  className="bg-transparent border border-gray-600 rounded px-3 py-1 font-medium focus:border-blue-500 focus:outline-none"
                  style={{ color: '#EAEAEA' }}
                >
                  <option value="Jio" style={{ background: '#1a1a1a' }}>Jio</option>
                  <option value="Airtel" style={{ background: '#1a1a1a' }}>Airtel</option>
                  <option value="Vi" style={{ background: '#1a1a1a' }}>Vi</option>
                  <option value="BSNL" style={{ background: '#1a1a1a' }}>BSNL</option>
                </select>
              ) : (
                <span className="font-medium" style={{ color: '#EAEAEA' }}>Jio</span>
              )}
            </div>
          </div>

          {/* Edit Actions */}
          {isEditing && (
            <div className="flex justify-end space-x-3 mt-6 pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-gray-700"
                style={{ background: 'rgba(107, 114, 128, 0.3)', color: '#B0B0B0' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

        {/* Account Details */}
        <div style={{
          background: 'rgba(20, 24, 32, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          padding: '20px'
        }}>
          <h2 className="text-base font-semibold mb-3" style={{ color: '#EAEAEA' }}>Account Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <span style={{ color: '#B0B0B0' }}>Account Type</span>
              <span className="font-medium" style={{ color: '#EAEAEA' }}>Standard</span>
            </div>
            <div className="flex justify-between py-2">
              <span style={{ color: '#B0B0B0' }}>Account Status</span>
              <span className="font-medium" style={{ color: '#22c55e' }}>Active</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          background: 'rgba(20, 24, 32, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          padding: '20px',
          textAlign: 'center'
        }}>
          <p className="mb-4" style={{ color: '#B0B0B0' }}>View your recharge history and transaction details</p>
          <Link
            to="/dashboard"
            className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Success Toast */}
        {showToast && (
          <div className="fixed top-4 right-4 z-50" style={{
            background: 'rgba(34, 197, 94, 0.9)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="flex items-center space-x-2">
              <span className="material-icons text-sm">check_circle</span>
              <span className="font-medium">Profile updated successfully!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;