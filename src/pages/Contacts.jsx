import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Contacts = ({ onNavigate }) => {
  const [savedNumbers, setSavedNumbers] = useState([
    { number: '9876543210', name: 'Mom', operator: 'airtel', tag: 'family' },
    { number: '8765432109', name: 'Dad', operator: 'jio', tag: 'family' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ number: '', name: '', tag: 'personal' });

  const handleAddContact = () => {
    if (newContact.number.length === 10 && newContact.name) {
      setSavedNumbers([...savedNumbers, { ...newContact, operator: 'airtel' }]);
      setNewContact({ number: '', name: '', tag: 'personal' });
      setShowAddForm(false);
    }
  };

  const handleQuickRecharge = (contact) => {
    onNavigate('recharge', { prefilledNumber: contact.number });
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
          + Add Number
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">📞 Saved Numbers</h1>

      <div className="space-y-4">
        {savedNumbers.map((contact, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{contact.name}</h3>
                  <p className="text-gray-600">+91 {contact.number}</p>
                  <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold mt-1">
                    {contact.tag}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleQuickRecharge(contact)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Recharge
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add New Contact</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Contact Name"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
              />
              
              <input
                type="tel"
                placeholder="Mobile Number"
                maxLength="10"
                value={newContact.number}
                onChange={(e) => setNewContact({...newContact, number: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
              />
              
              <select
                value={newContact.tag}
                onChange={(e) => setNewContact({...newContact, tag: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
              >
                <option value="personal">Personal</option>
                <option value="family">Family</option>
                <option value="work">Work</option>
                <option value="friend">Friend</option>
              </select>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 border-2 border-gray-300 py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold"
              >
                Save Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;