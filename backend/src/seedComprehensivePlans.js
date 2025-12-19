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

const comprehensivePlans = [
  // Popular Plans
  {
    operator: 'Jio',
    name: 'Best Value',
    price: 199,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema', 'JioCloud'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Jio',
    name: 'Recommended',
    price: 299,
    validity: 28,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema', 'JioSaavn'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Airtel',
    name: 'Best Value',
    price: 199,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Airtel Xstream', 'Wynk Music'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Airtel',
    name: 'Recommended',
    price: 349,
    validity: 28,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Airtel Xstream', 'Apollo 24/7'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Vi',
    name: 'Best Value',
    price: 199,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies', 'Vi TV'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Vi',
    name: 'Recommended',
    price: 299,
    validity: 28,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Weekend Data Rollover'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'BSNL',
    name: 'Best Value',
    price: 187,
    validity: 28,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Free Caller Tunes'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Jio',
    name: 'Recommended',
    price: 149,
    validity: 20,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Airtel',
    name: 'Best Value',
    price: 265,
    validity: 28,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Wynk Music', 'Xstream'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Vi',
    name: 'Best Value',
    price: 179,
    validity: 24,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Weekend Rollover'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'BSNL',
    name: 'Recommended',
    price: 153,
    validity: 28,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Free Caller Tunes'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Jio',
    name: 'Best Value',
    price: 259,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Airtel',
    name: 'Recommended',
    price: 299,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Xstream', 'Wynk Music'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Vi',
    name: 'Best Value',
    price: 239,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Weekend Rollover'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'BSNL',
    name: 'Recommended',
    price: 197,
    validity: 30,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Free Caller Tunes'],
    isPopular: true,
    category: 'popular'
  },

  // Unlimited Plans
  {
    operator: 'Jio',
    name: 'Long Validity',
    price: 666,
    validity: 84,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema', 'JioCloud'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'Airtel',
    name: 'Long Validity',
    price: 839,
    validity: 84,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Wynk Music', 'Xstream'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'Vi',
    name: 'Long Validity',
    price: 719,
    validity: 84,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Binge All Night'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'BSNL',
    name: 'Long Validity',
    price: 397,
    validity: 60,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Free Roaming'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'Jio',
    name: 'Long Validity',
    price: 749,
    validity: 90,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'Airtel',
    name: 'Premium',
    price: 999,
    validity: 84,
    data: '2.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Xstream', 'Apollo 24/7'],
    isPopular: true,
    category: 'unlimited'
  },
  {
    operator: 'Vi',
    name: 'Long Validity',
    price: 839,
    validity: 84,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Binge All Night'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'BSNL',
    name: 'Long Validity',
    price: 797,
    validity: 150,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Free Roaming'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'Jio',
    name: 'Long Validity',
    price: 1299,
    validity: 180,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema'],
    isPopular: true,
    category: 'unlimited'
  },
  {
    operator: 'Airtel',
    name: 'Long Validity',
    price: 1199,
    validity: 180,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Wynk Music'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'Vi',
    name: 'Long Validity',
    price: 1449,
    validity: 180,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Binge All Night'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'BSNL',
    name: 'Long Validity',
    price: 999,
    validity: 180,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Free Roaming'],
    isPopular: false,
    category: 'unlimited'
  },

  // Annual Plans
  {
    operator: 'Jio',
    name: 'Annual Plan',
    price: 2999,
    validity: 365,
    data: '2.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema', 'JioSaavn'],
    isPopular: false,
    category: 'annual'
  },
  {
    operator: 'Airtel',
    name: 'Annual Plan',
    price: 1799,
    validity: 365,
    data: '24GB',
    calls: 'Unlimited',
    sms: '3600',
    benefits: ['Xstream', 'Wynk Music'],
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
    benefits: ['Vi Movies', 'Vi Games'],
    isPopular: false,
    category: 'annual'
  },
  {
    operator: 'BSNL',
    name: 'Annual Plan',
    price: 1999,
    validity: 365,
    data: '600GB',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['High Speed Data'],
    isPopular: false,
    category: 'annual'
  },
  {
    operator: 'Jio',
    name: 'Annual Plan',
    price: 3227,
    validity: 365,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema', 'JioSaavn'],
    isPopular: true,
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
    benefits: ['Xstream', 'Wynk Music'],
    isPopular: true,
    category: 'annual'
  },
  {
    operator: 'Vi',
    name: 'Annual Plan',
    price: 2899,
    validity: 365,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies', 'Vi Games'],
    isPopular: false,
    category: 'annual'
  },
  {
    operator: 'BSNL',
    name: 'Annual Plan',
    price: 2399,
    validity: 365,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Free Roaming'],
    isPopular: true,
    category: 'annual'
  },
  {
    operator: 'Jio',
    name: 'Premium',
    price: 3999,
    validity: 365,
    data: '3GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema', 'JioSaavn'],
    isPopular: true,
    category: 'annual'
  },
  {
    operator: 'Airtel',
    name: 'Premium',
    price: 3999,
    validity: 365,
    data: '3GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Xstream', 'Wynk Music'],
    isPopular: true,
    category: 'annual'
  },
  {
    operator: 'Vi',
    name: 'Premium',
    price: 3999,
    validity: 365,
    data: '3GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies', 'Vi Games'],
    isPopular: true,
    category: 'annual'
  },
  {
    operator: 'BSNL',
    name: 'Annual Plan',
    price: 2999,
    validity: 365,
    data: '2.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Free Roaming'],
    isPopular: true,
    category: 'annual'
  },

  // Data Packs
  {
    operator: 'Jio',
    name: 'Extra Data',
    price: 61,
    validity: 28,
    data: '6GB',
    calls: 'NA',
    sms: 'NA',
    benefits: ['Data Booster'],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Airtel',
    name: 'Extra Data',
    price: 121,
    validity: 30,
    data: '12GB',
    calls: 'NA',
    sms: 'NA',
    benefits: ['High Speed Data'],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Vi',
    name: 'Extra Data',
    price: 58,
    validity: 28,
    data: '3GB',
    calls: 'NA',
    sms: 'NA',
    benefits: ['Data Booster'],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'BSNL',
    name: 'Extra Data',
    price: 151,
    validity: 30,
    data: '40GB',
    calls: 'NA',
    sms: 'NA',
    benefits: ['Data Booster'],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Jio',
    name: 'Extra Data',
    price: 222,
    validity: 30,
    data: '50GB',
    calls: 'NA',
    sms: 'NA',
    benefits: ['High Speed Data'],
    isPopular: true,
    category: 'data'
  },
  {
    operator: 'Airtel',
    name: 'Extra Data',
    price: 301,
    validity: 30,
    data: '50GB',
    calls: 'NA',
    sms: 'NA',
    benefits: ['High Speed Data'],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Vi',
    name: 'Extra Data',
    price: 418,
    validity: 28,
    data: '100GB',
    calls: 'NA',
    sms: 'NA',
    benefits: ['High Speed Data'],
    isPopular: true,
    category: 'data'
  },
  {
    operator: 'BSNL',
    name: 'Extra Data',
    price: 251,
    validity: 30,
    data: '70GB',
    calls: 'NA',
    sms: 'NA',
    benefits: ['High Speed Data'],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Jio',
    name: 'Extra Data',
    price: 444,
    validity: 30,
    data: '100GB',
    calls: 'NA',
    sms: 'NA',
    benefits: ['High Speed Data'],
    isPopular: true,
    category: 'data'
  },
  {
    operator: 'Airtel',
    name: 'Extra Data',
    price: 401,
    validity: 30,
    data: '100GB',
    calls: 'NA',
    sms: 'NA',
    benefits: ['High Speed Data'],
    isPopular: true,
    category: 'data'
  },
  {
    operator: 'Vi',
    name: 'Extra Data',
    price: 351,
    validity: 28,
    data: '100GB',
    calls: 'NA',
    sms: 'NA',
    benefits: ['High Speed Data'],
    isPopular: true,
    category: 'data'
  },
  {
    operator: 'BSNL',
    name: 'Extra Data',
    price: 399,
    validity: 30,
    data: '120GB',
    calls: 'NA',
    sms: 'NA',
    benefits: ['High Speed Data'],
    isPopular: true,
    category: 'data'
  },

  // Talktime Plans
  {
    operator: 'BSNL',
    name: 'Talktime',
    price: 100,
    validity: 0,
    data: 'NA',
    calls: '₹81 Talktime',
    sms: 'NA',
    benefits: ['No Expiry'],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Jio',
    name: 'Talktime',
    price: 50,
    validity: 0,
    data: 'NA',
    calls: '₹39.37 Talktime',
    sms: 'NA',
    benefits: ['No Expiry'],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Airtel',
    name: 'Talktime',
    price: 500,
    validity: 0,
    data: 'NA',
    calls: '₹423.73 Talktime',
    sms: 'NA',
    benefits: ['No Expiry'],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Vi',
    name: 'Talktime',
    price: 99,
    validity: 0,
    data: 'NA',
    calls: '₹82 Talktime',
    sms: 'NA',
    benefits: ['No Expiry'],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'BSNL',
    name: 'Talktime',
    price: 200,
    validity: 0,
    data: 'NA',
    calls: '₹165 Talktime',
    sms: 'NA',
    benefits: ['No Expiry'],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Jio',
    name: 'Talktime',
    price: 100,
    validity: 0,
    data: 'NA',
    calls: '₹81.75 Talktime',
    sms: 'NA',
    benefits: ['No Expiry'],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Airtel',
    name: 'Talktime',
    price: 100,
    validity: 0,
    data: 'NA',
    calls: '₹81.75 Talktime',
    sms: 'NA',
    benefits: ['No Expiry'],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Vi',
    name: 'Talktime',
    price: 100,
    validity: 0,
    data: 'NA',
    calls: '₹82 Talktime',
    sms: 'NA',
    benefits: ['No Expiry'],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'BSNL',
    name: 'Talktime',
    price: 100,
    validity: 0,
    data: 'NA',
    calls: '₹82 Talktime',
    sms: 'NA',
    benefits: ['No Expiry'],
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
    
    // Insert comprehensive plans
    await Plan.insertMany(comprehensivePlans);
    console.log('Comprehensive plans inserted successfully');
    
    console.log(`✅ Seeded ${comprehensivePlans.length} plans`);
    console.log('Plans per category:');
    console.log('- Popular: 15 plans');
    console.log('- Unlimited: 12 plans');
    console.log('- Annual: 12 plans');
    console.log('- Data: 12 plans');
    console.log('- Talktime: 9 plans');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding plans:', error);
    process.exit(1);
  }
};

seedPlans();