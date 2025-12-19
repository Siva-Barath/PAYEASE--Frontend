const PlanCard = ({ plan, onSelect, isPopular }) => {
  return (
    <div 
      onClick={onSelect}
      className={`bg-white border-2 rounded-2xl p-5 cursor-pointer hover:transform hover:-translate-y-1 transition-all ${
        isPopular ? 'border-blue-500' : 'border-gray-200 hover:border-blue-500'
      }`}
      style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)' }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-3xl font-bold" style={{ color: '#3A7BFF' }}>
          {plan.price}
        </div>
        <div className="text-sm" style={{ color: '#6F6F6F' }}>
          {plan.validity}
        </div>
      </div>
      
      <div className="text-base font-semibold mb-3" style={{ color: '#10B981' }}>
        {plan.data}
      </div>
      
      <ul className="space-y-2 mb-4">
        {plan.benefits.map((benefit, idx) => (
          <li key={idx} className="text-sm flex items-center gap-2" style={{ color: '#1A1A1A' }}>
            <span className="text-green-600 font-bold w-4">✓</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanCard;
