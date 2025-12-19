const Notifications = ({ onNavigate }) => {
  const notifications = [
    { icon: '🎉', title: 'Welcome Offer!', desc: 'Get 10% cashback on first recharge', time: '2 hours ago' },
    { icon: '✅', title: 'Recharge Successful', desc: 'Your recharge of ₹299 was successful', time: '1 day ago' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 font-semibold">
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Notifications</h2>

        <div className="space-y-4">
          {notifications.map((notif, idx) => (
            <div key={idx} className="flex gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer">
              <div className="text-3xl">{notif.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold">{notif.title}</h3>
                <p className="text-sm text-gray-600">{notif.desc}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
