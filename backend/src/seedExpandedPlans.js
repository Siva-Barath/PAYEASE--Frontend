const mongoose = require('mongoose');
const Plan = require('./models/Plan');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const expandedPlans = [
  // Popular Plans (10 plans)
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
  {
    operator: 'Jio',
    name: 'Student Special',
    price: 239,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioCinema', 'JioSaavn'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Airtel',
    name: 'Family Plan',
    price: 265,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Wynk Music', 'Airtel Xstream'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Vi',
    name: 'Weekend Special',
    price: 219,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies & TV', 'Weekend Data'],
    isPopular: true,
    category: 'popular'
  },

  // Unlimited Plans (8 plans)
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
  {
    operator: 'Jio',
    name: 'Unlimited Pro',
    price: 999,
    validity: 84,
    data: '3GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['All Jio Apps'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'Airtel',
    name: 'Unlimited Premium',
    price: 839,
    validity: 84,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Wynk Music', 'Airtel Xstream Premium'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'Vi',
    name: 'Unlimited Premium',
    price: 799,
    validity: 84,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies & TV Premium'],
    isPopular: false,
    category: 'unlimited'
  },

  // Data Plans (7 plans)
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
  {
    operator: 'Jio',
    name: 'Data Booster 5GB',
    price: 61,
    validity: 7,
    data: '5GB',
    calls: 'No',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Airtel',
    name: 'Data Booster 3GB',
    price: 48,
    validity: 3,
    data: '3GB',
    calls: 'No',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Vi',
    name: 'Data Booster 4GB',
    price: 65,
    validity: 7,
    data: '4GB',
    calls: 'No',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'data'
  },

  // Validity Plans (6 plans)
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
  {
    operator: 'Jio',
    name: 'Extended Validity',
    price: 2999,
    validity: 365,
    data: '2.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['All Jio Apps'],
    isPopular: false,
    category: 'validity'
  },
  {
    operator: 'Airtel',
    name: 'Long Term Plan',
    price: 1799,
    validity: 365,
    data: '24GB',
    calls: 'Unlimited',
    sms: '3600 SMS',
    benefits: ['Wynk Music'],
    isPopular: false,
    category: 'validity'
  },
  {
    operator: 'Vi',
    name: 'Extended Plan',
    price: 1699,
    validity: 365,
    data: '24GB',
    calls: 'Unlimited',
    sms: '3600 SMS',
    benefits: ['Vi Movies & TV'],
    isPopular: false,
    category: 'validity'
  },
  {
    operator: 'BSNL',
    name: 'Super Long Validity',
    price: 797,
    validity: 300,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: [],
    isPopular: false,
    category: 'validity'
  },

  // Annual Plans (5 plans)
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
  {
    operator: 'Vi',
    name: 'Annual Plan',
    price: 3099,
    validity: 365,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies & TV'],
    isPopular: false,
    category: 'annual'
  },
  {
    operator: 'Jio',
    name: 'Annual Premium',
    price: 4199,
    validity: 365,
    data: '3GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['All Jio Apps Premium'],
    isPopular: false,
    category: 'annual'
  },
  {
    operator: 'BSNL',
    name: 'Annual Plan',
    price: 1999,
    validity: 365,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: [],
    isPopular: false,
    category: 'annual'
  },

  // OTT Plans (6 plans)
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
  {
    operator: 'Airtel',
    name: 'Netflix Plan',
    price: 499,
    validity: 28,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Netflix Basic', 'Wynk Music'],
    isPopular: false,
    category: 'ott'
  },
  {
    operator: 'Vi',
    name: 'Disney+ Plan',
    price: 449,
    validity: 28,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Disney+ Hotstar', 'Vi Movies & TV'],
    isPopular: false,
    category: 'ott'
  },
  {
    operator: 'Jio',
    name: 'Entertainment Pack',
    price: 599,
    validity: 56,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioCinema Premium', 'JioSaavn Pro', 'JioTV+'],
    isPopular: false,
    category: 'ott'
  },
  {
    operator: 'Airtel',
    name: 'Prime Video Plan',
    price: 549,
    validity: 56,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Amazon Prime Video', 'Wynk Music'],
    isPopular: false,
    category: 'ott'
  },
  {
    operator: 'Vi',
    name: 'OTT Combo',
    price: 699,
    validity: 84,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Disney+ Hotstar', 'SonyLIV', 'Vi Movies & TV'],
    isPopular: false,
    category: 'ott'
  },

  // Talktime Plans (5 plans)
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
  },
  {
    operator: 'Airtel',
    name: 'Talktime Recharge',
    price: 35,
    validity: 28,
    data: 'No',
    calls: '₹35 Talktime',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Vi',
    name: 'Talktime Pack',
    price: 49,
    validity: 28,
    data: 'No',
    calls: '₹49 Talktime',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Jio',
    name: 'Special Talktime',
    price: 99,
    validity: 28,
    data: 'No',
    calls: '₹99 Talktime',
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
    
    // Insert expanded plans
    await Plan.insertMany(expandedPlans);
    console.log('Expanded plans inserted successfully');
    
    console.log(`✅ Seeded ${expandedPlans.length} plans`);
    console.log('Plans per category:');
    console.log('- Popular: 10 plans');
    console.log('- Unlimited: 8 plans');
    console.log('- Data: 7 plans');
    console.log('- Validity: 6 plans');
    console.log('- Annual: 5 plans');
    console.log('- OTT: 6 plans');
    console.log('- Talktime: 5 plans');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding plans:', error);
    process.exit(1);
  }
};

seedPlans();