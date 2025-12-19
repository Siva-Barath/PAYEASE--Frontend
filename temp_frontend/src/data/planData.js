export const planData = {
  airtel: {
    popular: [
      { price: '₹299', validity: '28 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Disney+ Hotstar Mobile', 'Wynk Music'], popular: true, savings: '₹50' },
      { price: '₹199', validity: '28 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Airtel Thanks benefits'] },
      { price: '₹449', validity: '56 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Amazon Prime Mobile'] },
      { price: '₹179', validity: '28 days', data: '1GB/day', benefits: ['Unlimited calls', '100 SMS/day'] },
      { price: '₹549', validity: '56 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Disney+ Hotstar Mobile'] },
    ],
    unlimited: [
      { price: '₹599', validity: '84 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Netflix Mobile', 'Disney+ Hotstar'] },
      { price: '₹719', validity: '84 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Amazon Prime'] },
      { price: '₹999', validity: '84 days', data: '3GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'All OTT apps'] },
    ],
    data: [
      { price: '₹19', validity: '1 day', data: '1GB', benefits: ['Full speed data'] },
      { price: '₹48', validity: '3 days', data: '3GB', benefits: ['Full speed data'] },
      { price: '₹98', validity: '7 days', data: '12GB', benefits: ['Full speed data'] },
    ],
    talktime: [
      { price: '₹10', validity: '7 days', data: 'No data', benefits: ['₹7.47 talktime', 'Local/STD calls'] },
      { price: '₹20', validity: '18 days', data: 'No data', benefits: ['₹14.95 talktime'] },
    ],
  },
  jio: {
    popular: [
      { price: '₹239', validity: '28 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'JioCinema Premium', 'JioSaavn Pro'], popular: true, savings: '₹60' },
      { price: '₹149', validity: '24 days', data: '1GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'JioApps suite'] },
      { price: '₹399', validity: '56 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'JioCinema Premium'] },
      { price: '₹179', validity: '28 days', data: '1GB/day', benefits: ['Unlimited calls', '100 SMS/day'] },
      { price: '₹666', validity: '84 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'JioApps'] },
    ],
    unlimited: [
      { price: '₹719', validity: '84 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Netflix Mobile', 'JioCinema Premium'] },
      { price: '₹999', validity: '84 days', data: '3GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Complete OTT suite'] },
      { price: '₹1299', validity: '84 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Netflix', 'Amazon Prime'] },
    ],
    data: [
      { price: '₹15', validity: '1 day', data: '1GB', benefits: ['High speed data', 'JioApps'] },
      { price: '₹25', validity: '2 days', data: '2GB', benefits: ['High speed data'] },
      { price: '₹51', validity: '7 days', data: '6GB', benefits: ['High speed data'] },
    ],
    talktime: [
      { price: '₹12', validity: '7 days', data: 'No data', benefits: ['₹9.12 talktime', 'Local/STD calls'] },
      { price: '₹22', validity: '18 days', data: 'No data', benefits: ['₹16.14 talktime'] },
    ],
  },
  vi: {
    popular: [
      { price: '₹269', validity: '28 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Vi Movies & TV'], popular: true, savings: '₹30' },
      { price: '₹179', validity: '28 days', data: '1GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Weekend data rollover'] },
      { price: '₹359', validity: '28 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Vi Movies & TV'] },
      { price: '₹479', validity: '56 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day'] },
    ],
    unlimited: [
      { price: '₹699', validity: '84 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Disney+ Hotstar Mobile'] },
      { price: '₹839', validity: '84 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Vi Movies & TV'] },
      { price: '₹1066', validity: '84 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Netflix Mobile'] },
    ],
    data: [
      { price: '₹17', validity: '1 day', data: '1GB', benefits: ['High speed data', 'Vi services'] },
      { price: '₹27', validity: '2 days', data: '2GB', benefits: ['High speed data'] },
      { price: '₹58', validity: '7 days', data: '7GB', benefits: ['High speed data'] },
    ],
    talktime: [
      { price: '₹11', validity: '7 days', data: 'No data', benefits: ['₹8.36 talktime', 'Local/STD calls'] },
      { price: '₹21', validity: '18 days', data: 'No data', benefits: ['₹15.98 talktime'] },
    ],
  },
};

export const operatorPatterns = {
  airtel: ['70', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '99'],
  jio: ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '88', '89'],
  vi: ['90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '70', '71'],
};

export const operatorLogos = {
  airtel: {
    name: 'Airtel',
    color: '#E60012',
    logo: '🔴',
    gradient: 'from-red-600 to-red-500'
  },
  jio: {
    name: 'Jio',
    color: '#0073E6',
    logo: '🔵',
    gradient: 'from-blue-600 to-blue-500'
  },
  vi: {
    name: 'Vi',
    color: '#990099',
    logo: '🟣',
    gradient: 'from-purple-600 to-purple-500'
  }
};
