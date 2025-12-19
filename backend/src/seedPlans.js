const mongoose = require('mongoose');
const Plan = require('./models/Plan');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/topify');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const samplePlans = [
  // Jio Plans - Popular
  {
    operator: 'Jio',
    name: 'Popular Plan',
    price: 149,
    validity: 20,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioCinema', 'JioTV'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Jio',
    name: 'Best Seller',
    price: 199,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioCinema', 'JioTV'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Jio',
    name: 'Top Choice',
    price: 299,
    validity: 28,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioCinema', 'JioSaavn'],
    isPopular: true,
    category: 'popular'
  },

  // Jio - Unlimited
  {
    operator: 'Jio',
    name: 'Truly Unlimited',
    price: 666,
    validity: 84,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioCinema'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'Jio',
    name: 'Unlimited Max',
    price: 719,
    validity: 84,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioCinema', 'JioSaavn'],
    isPopular: false,
    category: 'unlimited'
  },

  // Jio - Data
  {
    operator: 'Jio',
    name: 'Data Booster 1GB',
    price: 19,
    validity: 1,
    data: '1GB',
    calls: 'No',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Jio',
    name: 'Data Booster 2GB',
    price: 29,
    validity: 1,
    data: '2GB',
    calls: 'No',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'data'
  },

  // Jio - Validity
  {
    operator: 'Jio',
    name: 'Long Validity',
    price: 1559,
    validity: 336,
    data: '24GB',
    calls: 'Unlimited',
    sms: '3600 SMS',
    benefits: ['JioCinema'],
    isPopular: false,
    category: 'validity'
  },

  // Jio - Annual
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

  // Jio - OTT
  {
    operator: 'Jio',
    name: 'OTT Plan',
    price: 399,
    validity: 28,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioCinema Premium', 'JioSaavn Pro'],
    isPopular: false,
    category: 'ott'
  },

  // Jio - Talktime
  {
    operator: 'Jio',
    name: 'Talktime Plan',
    price: 22,
    validity: 18,
    data: 'No',
    calls: '₹22 Talktime',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'talktime'
  },

  // Airtel Plans - Popular
  {
    operator: 'Airtel',
    name: 'Smart Plan',
    price: 155,
    validity: 24,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Wynk Music'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Airtel',
    name: 'Popular Choice',
    price: 179,
    validity: 28,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Wynk Music', 'Airtel Thanks'],
    isPopular: true,
    category: 'popular'
  },

  // Airtel - Unlimited
  {
    operator: 'Airtel',
    name: 'Unlimited Plan',
    price: 549,
    validity: 56,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Wynk Music'],
    isPopular: false,
    category: 'unlimited'
  },

  // Airtel - Data
  {
    operator: 'Airtel',
    name: 'Data Add-on',
    price: 19,
    validity: 1,
    data: '1GB',
    calls: 'No',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'data'
  },

  // Airtel - Annual
  {
    operator: 'Airtel',
    name: 'Annual Plan',
    price: 2999,
    validity: 365,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Airtel Thanks'],
    isPopular: false,
    category: 'annual'
  },

  // Vi Plans - Popular
  {
    operator: 'Vi',
    name: 'Value Plan',
    price: 157,
    validity: 28,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies & TV'],
    isPopular: true,
    category: 'popular'
  },

  // Vi - Unlimited
  {
    operator: 'Vi',
    name: 'Unlimited Plan',
    price: 539,
    validity: 56,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies & TV'],
    isPopular: false,
    category: 'unlimited'
  },

  // Vi - Data
  {
    operator: 'Vi',
    name: 'Data Pack',
    price: 19,
    validity: 1,
    data: '1GB',
    calls: 'No',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'data'
  },

  // BSNL Plans - Popular
  {
    operator: 'BSNL',
    name: 'Budget Plan',
    price: 97,
    validity: 28,
    data: '2GB total',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: [],
    isPopular: true,
    category: 'popular'
  },

  // BSNL - Unlimited
  {
    operator: 'BSNL',
    name: 'Unlimited Plan',
    price: 187,
    validity: 28,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: [],
    isPopular: false,
    category: 'unlimited'
  },

  // BSNL - Validity
  {
    operator: 'BSNL',
    name: 'Long Validity',
    price: 397,
    validity: 150,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: [],
    isPopular: false,
    category: 'validity'
  },

  // BSNL - Talktime
  {
    operator: 'BSNL',
    name: 'Talktime Plan',
    price: 22,
    validity: 18,
    data: 'No',
    calls: '₹22 Talktime',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'talktime'
  }
];

const seedPlans = async () => {
  try {
    await connectDB();
    
    // Clear existing plans
    await Plan.deleteMany({});
    console.log('Cleared existing plans');
    
    // Insert sample plans
    await Plan.insertMany(samplePlans);
    console.log('Sample plans inserted successfully');
    
    console.log(`✅ Seeded ${samplePlans.length} plans`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding plans:', error);
    process.exit(1);
  }
};

seedPlans();