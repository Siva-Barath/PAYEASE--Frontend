const mongoose = require('mongoose');
const Plan = require('./models/Plan');
require('dotenv').config();

const samplePlans = [
  // Jio Plans
  {
    operator: 'Jio',
    name: 'Jio ₹149 Plan',
    price: 149,
    validity: 24,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema', 'JioSaavn'],
    isPopular: true,
    category: 'prepaid'
  },
  {
    operator: 'Jio',
    name: 'Jio ₹399 Plan',
    price: 399,
    validity: 84,
    data: '2.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema', 'JioSaavn', 'Disney+ Hotstar'],
    isPopular: true,
    category: 'prepaid'
  },
  {
    operator: 'Jio',
    name: 'Jio ₹666 Plan',
    price: 666,
    validity: 84,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema', 'Netflix Basic', 'Amazon Prime'],
    category: 'prepaid'
  },

  // Airtel Plans
  {
    operator: 'Airtel',
    name: 'Airtel ₹155 Plan',
    price: 155,
    validity: 24,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Airtel Xstream', 'Wynk Music'],
    isPopular: true,
    category: 'prepaid'
  },
  {
    operator: 'Airtel',
    name: 'Airtel ₹409 Plan',
    price: 409,
    validity: 84,
    data: '2.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Disney+ Hotstar', 'Airtel Xstream', 'Wynk Music'],
    isPopular: true,
    category: 'prepaid'
  },
  {
    operator: 'Airtel',
    name: 'Airtel ₹719 Plan',
    price: 719,
    validity: 84,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Netflix Basic', 'Amazon Prime', 'Disney+ Hotstar'],
    category: 'prepaid'
  },

  // Vi Plans
  {
    operator: 'Vi',
    name: 'Vi ₹154 Plan',
    price: 154,
    validity: 24,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies & TV'],
    category: 'prepaid'
  },
  {
    operator: 'Vi',
    name: 'Vi ₹405 Plan',
    price: 405,
    validity: 84,
    data: '2.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Disney+ Hotstar', 'Vi Movies & TV'],
    isPopular: true,
    category: 'prepaid'
  },

  // BSNL Plans
  {
    operator: 'BSNL',
    name: 'BSNL ₹108 Plan',
    price: 108,
    validity: 25,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['BSNL Tunes'],
    category: 'prepaid'
  },
  {
    operator: 'BSNL',
    name: 'BSNL ₹187 Plan',
    price: 187,
    validity: 28,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['BSNL Tunes', 'Location Based Services'],
    category: 'prepaid'
  }
];

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Plan.deleteMany({});
    console.log('Cleared existing plans');

    await Plan.insertMany(samplePlans);
    console.log('Sample plans inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedPlans();