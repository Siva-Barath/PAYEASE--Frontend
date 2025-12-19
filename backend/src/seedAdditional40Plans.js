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

const additionalPlans = [
  {
    operator: 'Jio',
    name: 'Popular Plan 209',
    price: 209,
    validity: 22,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Jio',
    name: 'Best Value 555',
    price: 555,
    validity: 56,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'Jio',
    name: 'Data Pack 155',
    price: 155,
    validity: 24,
    data: '12GB',
    calls: 'No',
    sms: 'No',
    benefits: ['High Speed Data'],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Jio',
    name: 'Talktime 200',
    price: 200,
    validity: 0,
    data: 'No',
    calls: '₹164 Talktime',
    sms: 'No',
    benefits: ['No Expiry'],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Airtel',
    name: 'Best Value 219',
    price: 219,
    validity: 30,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Wynk Music', 'Xstream'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Airtel',
    name: 'Recommended 599',
    price: 599,
    validity: 56,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Xstream'],
    isPopular: true,
    category: 'unlimited'
  },
  {
    operator: 'Airtel',
    name: 'Data Pack 121',
    price: 121,
    validity: 28,
    data: '6GB',
    calls: 'No',
    sms: 'No',
    benefits: ['High Speed Data'],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Airtel',
    name: 'Talktime 300',
    price: 300,
    validity: 0,
    data: 'No',
    calls: '₹253 Talktime',
    sms: 'No',
    benefits: ['No Expiry'],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Vi',
    name: 'Recommended 199',
    price: 199,
    validity: 25,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Weekend Rollover'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Vi',
    name: 'Long Validity 719',
    price: 719,
    validity: 70,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Binge All Night'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'Vi',
    name: 'Data Pack 181',
    price: 181,
    validity: 28,
    data: '20GB',
    calls: 'No',
    sms: 'No',
    benefits: ['High Speed Data'],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Vi',
    name: 'Talktime 200',
    price: 200,
    validity: 0,
    data: 'No',
    calls: '₹165 Talktime',
    sms: 'No',
    benefits: ['No Expiry'],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'BSNL',
    name: 'Best Value 187',
    price: 187,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Free Caller Tunes'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'BSNL',
    name: 'Long Validity 699',
    price: 699,
    validity: 90,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Free Roaming'],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'BSNL',
    name: 'Data Pack 198',
    price: 198,
    validity: 30,
    data: '40GB',
    calls: 'No',
    sms: 'No',
    benefits: ['High Speed Data'],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'BSNL',
    name: 'Talktime 300',
    price: 300,
    validity: 0,
    data: 'No',
    calls: '₹246 Talktime',
    sms: 'No',
    benefits: ['No Expiry'],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Jio',
    name: 'Annual Plan 2799',
    price: 2799,
    validity: 365,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema'],
    isPopular: true,
    category: 'annual'
  },
  {
    operator: 'Airtel',
    name: 'Annual Plan 2699',
    price: 2699,
    validity: 365,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Xstream', 'Wynk Music'],
    isPopular: true,
    category: 'annual'
  },
  {
    operator: 'Vi',
    name: 'Annual Plan 2499',
    price: 2499,
    validity: 365,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies'],
    isPopular: false,
    category: 'annual'
  },
  {
    operator: 'BSNL',
    name: 'Annual Plan 1999',
    price: 1999,
    validity: 365,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Free Roaming'],
    isPopular: true,
    category: 'annual'
  },
  {
    operator: 'Jio',
    name: 'Best Value 149',
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
    operator: 'Jio',
    name: 'Recommended 199',
    price: 199,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema', 'JioCloud'],
    isPopular: true,
    category: 'unlimited'
  },
  {
    operator: 'Jio',
    name: 'Long Validity 2999',
    price: 2999,
    validity: 365,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema', 'JioCloud'],
    isPopular: true,
    category: 'annual'
  },
  {
    operator: 'Airtel',
    name: 'Data Booster 179',
    price: 179,
    validity: 28,
    data: '2GB',
    calls: 'Unlimited',
    sms: '300',
    benefits: ['Wynk Music'],
    isPopular: false,
    category: 'popular'
  },
  {
    operator: 'Airtel',
    name: 'Recommended 265',
    price: 265,
    validity: 28,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Wynk Music', 'Xstream'],
    isPopular: true,
    category: 'unlimited'
  },
  {
    operator: 'Airtel',
    name: 'Budget Annual 1799',
    price: 1799,
    validity: 365,
    data: '24GB',
    calls: 'Unlimited',
    sms: '3600',
    benefits: ['Wynk Music'],
    isPopular: false,
    category: 'annual'
  },
  {
    operator: 'Vi',
    name: 'Best Seller 199',
    price: 199,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies & TV'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Vi',
    name: 'Recommended 299',
    price: 299,
    validity: 28,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies & TV', 'Weekend Data Rollover'],
    isPopular: true,
    category: 'unlimited'
  },
  {
    operator: 'Vi',
    name: 'Long Validity 3099',
    price: 3099,
    validity: 365,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies & TV'],
    isPopular: false,
    category: 'annual'
  },
  {
    operator: 'BSNL',
    name: 'Budget Plan 147',
    price: 147,
    validity: 30,
    data: '10GB',
    calls: 'Unlimited',
    sms: '300',
    benefits: [],
    isPopular: false,
    category: 'popular'
  },
  {
    operator: 'BSNL',
    name: 'Value Pack 187',
    price: 187,
    validity: 28,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: [],
    isPopular: false,
    category: 'unlimited'
  },
  {
    operator: 'BSNL',
    name: 'Long Validity 1999',
    price: 1999,
    validity: 365,
    data: '600GB',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: [],
    isPopular: false,
    category: 'annual'
  },
  {
    operator: 'Jio',
    name: 'Data Booster 61',
    price: 61,
    validity: 28,
    data: '6GB',
    calls: 'No',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Airtel',
    name: 'Data Add-on 58',
    price: 58,
    validity: 28,
    data: '3GB',
    calls: 'No',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Vi',
    name: 'Extra Data 98',
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
    name: 'No Expiry 100',
    price: 100,
    validity: 0,
    data: 'No',
    calls: '₹81.75 Talktime',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Airtel',
    name: 'No Expiry 500',
    price: 500,
    validity: 0,
    data: 'No',
    calls: '₹423.73 Talktime',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Vi',
    name: 'No Expiry 99',
    price: 99,
    validity: 0,
    data: 'No',
    calls: '₹74 Talktime',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'BSNL',
    name: 'No Expiry 50',
    price: 50,
    validity: 0,
    data: 'No',
    calls: '₹39.37 Talktime',
    sms: 'No',
    benefits: [],
    isPopular: false,
    category: 'talktime'
  },
  {
    operator: 'Jio',
    name: 'Long Validity 666',
    price: 666,
    validity: 84,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioTV', 'JioCinema'],
    isPopular: true,
    category: 'unlimited'
  }
];

const seedAdditionalPlans = async () => {
  try {
    await connectDB();
    
    // Insert additional plans without clearing existing ones
    await Plan.insertMany(additionalPlans);
    console.log('Additional plans inserted successfully');
    
    console.log(`✅ Added ${additionalPlans.length} additional plans`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding additional plans:', error);
    process.exit(1);
  }
};

seedAdditionalPlans();