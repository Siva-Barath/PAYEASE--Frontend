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

const correctPlans = [
  // Jio Popular Plans
  {
    operator: 'Jio',
    category: 'Popular',
    price: 149,
    validity: '20',
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: true,
    highlight: 'Recommended',
    benefits: ['JioCinema', 'JioTV']
  },
  {
    operator: 'Jio',
    category: 'Popular',
    price: 199,
    validity: '28',
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: true,
    highlight: 'Best Value',
    benefits: ['JioCinema', 'JioTV', 'JioSaavn']
  },
  {
    operator: 'Jio',
    category: 'Popular',
    price: 299,
    validity: '28',
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: true,
    highlight: 'Most Popular',
    benefits: ['JioCinema Premium', 'JioSaavn Pro']
  },

  // Jio Unlimited Plans
  {
    operator: 'Jio',
    category: 'Unlimited',
    price: 666,
    validity: '84',
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: false,
    highlight: 'Long Validity',
    benefits: ['JioCinema']
  },
  {
    operator: 'Jio',
    category: 'Unlimited',
    price: 719,
    validity: '84',
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: false,
    highlight: 'Premium',
    benefits: ['JioCinema Premium', 'JioSaavn Pro']
  },

  // Jio Data Packs
  {
    operator: 'Jio',
    category: 'Data Packs',
    price: 19,
    validity: '1',
    data: '1GB',
    calls: 'No',
    sms: 'No',
    type: 'Data',
    popular: false,
    highlight: 'Quick Top-up',
    benefits: []
  },
  {
    operator: 'Jio',
    category: 'Data Packs',
    price: 29,
    validity: '1',
    data: '2GB',
    calls: 'No',
    sms: 'No',
    type: 'Data',
    popular: false,
    highlight: 'Value Pack',
    benefits: []
  },

  // Jio Annual Plans
  {
    operator: 'Jio',
    category: 'Annual',
    price: 2999,
    validity: '365',
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Annual',
    popular: false,
    highlight: 'Best Savings',
    benefits: ['All Jio Apps', 'JioCinema Premium']
  },

  // Jio Talktime
  {
    operator: 'Jio',
    category: 'Talktime',
    price: 22,
    validity: '18',
    data: 'No',
    calls: '₹22 Talktime',
    sms: 'No',
    type: 'Talktime',
    popular: false,
    highlight: 'Basic',
    benefits: []
  },

  // Airtel Popular Plans
  {
    operator: 'Airtel',
    category: 'Popular',
    price: 155,
    validity: '24',
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: true,
    highlight: 'Recommended',
    benefits: ['Wynk Music', 'Airtel Xstream']
  },
  {
    operator: 'Airtel',
    category: 'Popular',
    price: 179,
    validity: '28',
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: true,
    highlight: 'Best Value',
    benefits: ['Wynk Music', 'Airtel Thanks']
  },
  {
    operator: 'Airtel',
    category: 'Popular',
    price: 265,
    validity: '28',
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: true,
    highlight: 'Most Popular',
    benefits: ['Wynk Music', 'Airtel Xstream Premium']
  },

  // Airtel Unlimited Plans
  {
    operator: 'Airtel',
    category: 'Unlimited',
    price: 549,
    validity: '56',
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: false,
    highlight: 'Long Validity',
    benefits: ['Wynk Music', 'Airtel Thanks']
  },

  // Airtel Data Packs
  {
    operator: 'Airtel',
    category: 'Data Packs',
    price: 19,
    validity: '1',
    data: '1GB',
    calls: 'No',
    sms: 'No',
    type: 'Data',
    popular: false,
    highlight: 'Quick Top-up',
    benefits: []
  },

  // Airtel Annual
  {
    operator: 'Airtel',
    category: 'Annual',
    price: 2999,
    validity: '365',
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Annual',
    popular: false,
    highlight: 'Best Savings',
    benefits: ['Airtel Thanks Premium']
  },

  // Vi Popular Plans
  {
    operator: 'Vi',
    category: 'Popular',
    price: 157,
    validity: '28',
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: true,
    highlight: 'Recommended',
    benefits: ['Vi Movies & TV']
  },
  {
    operator: 'Vi',
    category: 'Popular',
    price: 219,
    validity: '28',
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: true,
    highlight: 'Best Value',
    benefits: ['Vi Movies & TV', 'Weekend Data Rollover']
  },

  // Vi Unlimited
  {
    operator: 'Vi',
    category: 'Unlimited',
    price: 539,
    validity: '56',
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: false,
    highlight: 'Long Validity',
    benefits: ['Vi Movies & TV']
  },

  // Vi Data Packs
  {
    operator: 'Vi',
    category: 'Data Packs',
    price: 19,
    validity: '1',
    data: '1GB',
    calls: 'No',
    sms: 'No',
    type: 'Data',
    popular: false,
    highlight: 'Quick Top-up',
    benefits: []
  },

  // BSNL Popular Plans
  {
    operator: 'BSNL',
    category: 'Popular',
    price: 97,
    validity: '28',
    data: '2GB total',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: true,
    highlight: 'Recommended',
    benefits: []
  },
  {
    operator: 'BSNL',
    category: 'Popular',
    price: 187,
    validity: '28',
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: true,
    highlight: 'Best Value',
    benefits: []
  },

  // BSNL Unlimited
  {
    operator: 'BSNL',
    category: 'Unlimited',
    price: 397,
    validity: '150',
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    type: 'Prepaid',
    popular: false,
    highlight: 'Long Validity',
    benefits: []
  },

  // BSNL Talktime
  {
    operator: 'BSNL',
    category: 'Talktime',
    price: 22,
    validity: '18',
    data: 'No',
    calls: '₹22 Talktime',
    sms: 'No',
    type: 'Talktime',
    popular: false,
    highlight: 'Basic',
    benefits: []
  }
];

const seedCorrectPlans = async () => {
  try {
    await connectDB();
    
    // Clear existing plans
    await Plan.deleteMany({});
    console.log('Cleared existing plans');
    
    // Insert correct plans
    await Plan.insertMany(correctPlans);
    console.log('Correct plans inserted successfully');
    
    console.log(`✅ Seeded ${correctPlans.length} plans with proper schema`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding plans:', error);
    process.exit(1);
  }
};

seedCorrectPlans();