import { useState } from 'react';

const AutoRecharge = ({ onNavigate }) => {
  const [schedules, setSchedules] = useState([
    { id: 1, number: '9876543210', amount: '₹299', frequency: 'monthly', nextDate: '15 Jan 2025', active: true },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    number: '',
    amount: '',
    frequency: 'monthly',
    startDate: ''
  });

  const handleAddSchedule = () => {
    if (newSchedule.number && newSchedule.amount && newSchedule.startDate) {
      const schedule = {
        id: Date.now(),
        ...newSchedule,
        amount: '₹' + newSchedule.amount,
        nextDate: new Date(newSchedule.startDate).toLocaleDateString('en-GB'),
        active: true
      };
      setSchedules([...schedules, schedule]);
      setNewSchedule({ number: '', amount: '', frequency: 'monthly', startDate: '' });
      setShowAddForm(false);
      alert('✅ Auto-recharge scheduled successfully!');
    }
  };

  const toggleSchedule = (id) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id ? { ...schedule, active: !schedule.active } : schedule
    ));
  };

  const deleteSchedule = (id) => {
    if (confirm('Are you sure you want to delete this schedule?')) {
      setSchedules(schedules.filter(schedule => schedule.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => onNavigate('dashboard')} className="text-blue-600 font-semibold">
          ← Back
        </button>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold"
        >
          + Schedule Recharge
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">⏰ Auto Recharge</h1>
        <p className="text-gray-600">Never run out of balance with scheduled recharges</p>
      </div>

      {/* Active Schedules */}
      <div className="space-y-4 mb-8">
        {schedules.map(schedule => (
          <div key={schedule.id} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${schedule.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                  {schedule.active ? '✓' : '⏸️'}
                </div>
                <div>
                  <h3 className="text-lg font-bold">+91 {schedule.number}</h3>
                  <p className="text-gray-600">{schedule.amount} • {schedule.frequency}</p>
                  <p className="text-sm text-gray-500">Next recharge: {schedule.nextDate}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleSchedule(schedule.id)}
                  className={`px-4 py-2 rounded-lg font-semibold ${schedule.active ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}
                >
                  {schedule.active ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={() => deleteSchedule(schedule.id)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {schedules.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⏰</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No scheduled recharges</h3>
          <p className="text-gray-500">Set up auto-recharge to never miss a recharge</p>
        </div>
      )}

      {/* Add Schedule Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule Auto Recharge</h3>
            
            <div className="space-y-4">
              <input
                type="tel"
                placeholder="Mobile Number"
                maxLength="10"
                value={newSchedule.number}
                onChange={(e) => setNewSchedule({...newSchedule, number: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
              />
              
              <input
                type="number"
                placeholder="Recharge Amount"
                value={newSchedule.amount}
                onChange={(e) => setNewSchedule({...newSchedule, amount: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
              />
              
              <select
                value={newSchedule.frequency}
                onChange={(e) => setNewSchedule({...newSchedule, frequency: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>

              <input
                type="date"
                value={newSchedule.startDate}
                onChange={(e) => setNewSchedule({...newSchedule, startDate: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 border-2 border-gray-300 py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSchedule}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoRecharge;