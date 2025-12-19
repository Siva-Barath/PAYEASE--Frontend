const ServiceCard = ({ icon, title, subtitle, onClick, gradient }) => {
  return (
    <div 
      onClick={onClick}
      className={`${gradient} p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform shadow-lg`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm opacity-90">{subtitle}</p>
    </div>
  );
};

export default ServiceCard;
