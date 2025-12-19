const Offers = () => {
  const offers = [
    { id: 1, title: '10% Cashback', desc: 'On first recharge', type: 'Cashback', color: 'bg-green-100 text-green-800' },
    { id: 2, title: 'Free DTH', desc: 'With annual plans', type: 'Trending', color: 'bg-blue-100 text-blue-800' },
    { id: 3, title: 'Bill Reminder', desc: 'Never miss a payment', type: 'Latest', color: 'bg-purple-100 text-purple-800' },
    { id: 4, title: 'Double Data', desc: 'On weekend recharges', type: 'Discounts', color: 'bg-orange-100 text-orange-800' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Special Offers</h1>
        <p className="text-gray-600 mt-1">Exclusive deals and cashback offers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${offer.color}`}>
              {offer.type}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{offer.title}</h3>
            <p className="text-gray-600 mb-4">{offer.desc}</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Apply Offer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;