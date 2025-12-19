const mongoose = require('mongoose');
const Plan = require('./models/Plan');
require('dotenv').config();

const samplePlans = [
  // Jio Plans
  {
    operator: 'Jio',
    name: 'Popular Plan',
    price: 199,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioCinema', 'JioTV'],
    isPopular: true,
    category: 'prepaid'
  },
  {
    operator: 'Jio',
    name: 'Data Booster',
    price: 98,
    validity: 28,
    data: '12GB',
    calls: 'No',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Jio',
    name: 'Annual Plan',
    price: 2999,
    validity: 365,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['All Jio Apps'],
    isPopular: false,
    category: 'annual'
  },
  
  // Airtel Plans
  {
    operator: 'Airtel',
    name: 'Smart Plan',
    price: 239,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Wynk Music', 'Airtel Xstream'],
    isPopular: true,
    category: 'prepaid'
  },
  {
    operator: 'Airtel',
    name: 'Data Pack',
    price: 118,
    validity: 28,
    data: '12GB',
    calls: 'No',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'data'
  },
  
  // Vi Plans
  {
    operator: 'Vi',
    name: 'Hero Plan',
    price: 199,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies & TV'],
    isPopular: true,
    category: 'prepaid'
  },
  
  // BSNL Plans
  {
    operator: 'BSNL',
    name: 'Value Plan',
    price: 187,
    validity: 28,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: [],
    isPopular: true,
    category: 'prepaid'
  }
];

const seedSamplePlans = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/topify');
    console.log('Connected to MongoDB');

    // Clear existing plans
    await Plan.deleteMany({});
    console.log('Cleared existing plans');

    // Insert sample plans
    await Plan.insertMany(samplePlans);
    console.log('Sample plans inserted successfully');

    console.log('Sample plans seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding sample plans:', error);
    process.exit(1);
  }
};

seedSamplePlans();