const mongoose = require('mongoose');
const Plan = require('./models/Plan');
require('dotenv').config();

const professionalPlans = [
  {
    "id": 1,
    "operator": "Airtel",
    "category": "Popular",
    "price": 179,
    "validity": "28 days",
    "data": "1GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Best Value",
    "benefits": [
      "1GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 2,
    "operator": "Airtel",
    "category": "Popular",
    "price": 199,
    "validity": "28 days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": [
      "1.5GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 3,
    "operator": "Airtel",
    "category": "Popular",
    "price": 249,
    "validity": "28 days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": [
      "2GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 4,
    "operator": "Airtel",
    "category": "Popular",
    "price": 399,
    "validity": "28 days",
    "data": "2.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Premium",
    "benefits": [
      "2.5GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 5,
    "operator": "Airtel",
    "category": "Data Packs",
    "price": 19,
    "validity": "1 day",
    "data": "1GB",
    "calls": "No",
    "sms": "No",
    "type": "data",
    "popular": false,
    "highlight": "Extra Data Pack",
    "benefits": [
      "1GB data",
      "Works with active plan"
    ]
  },
  {
    "id": 6,
    "operator": "Airtel",
    "category": "Data Packs",
    "price": 58,
    "validity": "28 days",
    "data": "3GB",
    "calls": "No",
    "sms": "No",
    "type": "data",
    "popular": false,
    "highlight": "Extra Data Pack",
    "benefits": [
      "3GB data",
      "Works with active plan"
    ]
  },
  {
    "id": 7,
    "operator": "Airtel",
    "category": "Data Packs",
    "price": 118,
    "validity": "28 days",
    "data": "12GB",
    "calls": "No",
    "sms": "No",
    "type": "data",
    "popular": true,
    "highlight": "Extra Data Pack",
    "benefits": [
      "12GB data",
      "Works with active plan"
    ]
  },
  {
    "id": 8,
    "operator": "Airtel",
    "category": "Unlimited",
    "price": 549,
    "validity": "56 days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": [
      "1.5GB/day",
      "Unlimited calls",
      "Long validity"
    ]
  },
  {
    "id": 9,
    "operator": "Airtel",
    "category": "Unlimited",
    "price": 719,
    "validity": "84 days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Long Validity",
    "benefits": [
      "1.5GB/day",
      "Unlimited calls",
      "Long validity"
    ]
  },
  {
    "id": 10,
    "operator": "Airtel",
    "category": "Talktime",
    "price": 10,
    "validity": "NA",
    "data": "No",
    "calls": "₹7.47",
    "sms": "No",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime Recharge",
    "benefits": [
      "₹7.47 talktime"
    ]
  },
  {
    "id": 11,
    "operator": "Airtel",
    "category": "Talktime",
    "price": 50,
    "validity": "28 days",
    "data": "No",
    "calls": "₹38.52",
    "sms": "No",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime Recharge",
    "benefits": [
      "₹38.52 talktime"
    ]
  },
  {
    "id": 12,
    "operator": "Airtel",
    "category": "Talktime",
    "price": 100,
    "validity": "NA",
    "data": "No",
    "calls": "₹81.75",
    "sms": "No",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime Recharge",
    "benefits": [
      "₹81.75 talktime"
    ]
  },
  {
    "id": 13,
    "operator": "Jio",
    "category": "Popular",
    "price": 155,
    "validity": "28 days",
    "data": "1GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Best Value",
    "benefits": [
      "1GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 14,
    "operator": "Jio",
    "category": "Popular",
    "price": 209,
    "validity": "28 days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": [
      "1.5GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 15,
    "operator": "Jio",
    "category": "Popular",
    "price": 239,
    "validity": "28 days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": [
      "2GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 16,
    "operator": "Jio",
    "category": "Popular",
    "price": 349,
    "validity": "28 days",
    "data": "2.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Premium",
    "benefits": [
      "2.5GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 17,
    "operator": "Jio",
    "category": "Data Packs",
    "price": 15,
    "validity": "1 day",
    "data": "1GB",
    "calls": "No",
    "sms": "No",
    "type": "data",
    "popular": false,
    "highlight": "Extra Data Pack",
    "benefits": [
      "1GB data",
      "Works with active plan"
    ]
  },
  {
    "id": 18,
    "operator": "Jio",
    "category": "Data Packs",
    "price": 61,
    "validity": "28 days",
    "data": "6GB",
    "calls": "No",
    "sms": "No",
    "type": "data",
    "popular": false,
    "highlight": "Extra Data Pack",
    "benefits": [
      "6GB data",
      "Works with active plan"
    ]
  },
  {
    "id": 19,
    "operator": "Jio",
    "category": "Data Packs",
    "price": 101,
    "validity": "28 days",
    "data": "12GB",
    "calls": "No",
    "sms": "No",
    "type": "data",
    "popular": true,
    "highlight": "Extra Data Pack",
    "benefits": [
      "12GB data",
      "Works with active plan"
    ]
  },
  {
    "id": 20,
    "operator": "Jio",
    "category": "Unlimited",
    "price": 533,
    "validity": "56 days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": [
      "1.5GB/day",
      "Unlimited calls",
      "Long validity"
    ]
  },
  {
    "id": 21,
    "operator": "Jio",
    "category": "Unlimited",
    "price": 666,
    "validity": "84 days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Long Validity",
    "benefits": [
      "1.5GB/day",
      "Unlimited calls",
      "Long validity"
    ]
  },
  {
    "id": 22,
    "operator": "Jio",
    "category": "Talktime",
    "price": 10,
    "validity": "NA",
    "data": "No",
    "calls": "₹7.36",
    "sms": "No",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime Recharge",
    "benefits": [
      "₹7.36 talktime"
    ]
  },
  {
    "id": 23,
    "operator": "Jio",
    "category": "Talktime",
    "price": 50,
    "validity": "28 days",
    "data": "No",
    "calls": "₹39.37",
    "sms": "No",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime Recharge",
    "benefits": [
      "₹39.37 talktime"
    ]
  },
  {
    "id": 24,
    "operator": "Jio",
    "category": "Talktime",
    "price": 100,
    "validity": "NA",
    "data": "No",
    "calls": "₹81.75",
    "sms": "No",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime Recharge",
    "benefits": [
      "₹81.75 talktime"
    ]
  },
  {
    "id": 25,
    "operator": "Vi",
    "category": "Popular",
    "price": 199,
    "validity": "28 days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": [
      "1.5GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 26,
    "operator": "Vi",
    "category": "Popular",
    "price": 249,
    "validity": "28 days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": [
      "2GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 27,
    "operator": "Vi",
    "category": "Popular",
    "price": 299,
    "validity": "28 days",
    "data": "2.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": [
      "2.5GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 28,
    "operator": "Vi",
    "category": "Popular",
    "price": 399,
    "validity": "28 days",
    "data": "3GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Premium",
    "benefits": [
      "3GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 29,
    "operator": "Vi",
    "category": "Data Packs",
    "price": 19,
    "validity": "1 day",
    "data": "1GB",
    "calls": "No",
    "sms": "No",
    "type": "data",
    "popular": false,
    "highlight": "Extra Data Pack",
    "benefits": [
      "1GB data",
      "Works with active plan"
    ]
  },
  {
    "id": 30,
    "operator": "Vi",
    "category": "Data Packs",
    "price": 65,
    "validity": "28 days",
    "data": "4GB",
    "calls": "No",
    "sms": "No",
    "type": "data",
    "popular": false,
    "highlight": "Extra Data Pack",
    "benefits": [
      "4GB data",
      "Works with active plan"
    ]
  },
  {
    "id": 31,
    "operator": "Vi",
    "category": "Data Packs",
    "price": 118,
    "validity": "28 days",
    "data": "12GB",
    "calls": "No",
    "sms": "No",
    "type": "data",
    "popular": true,
    "highlight": "Extra Data Pack",
    "benefits": [
      "12GB data",
      "Works with active plan"
    ]
  },
  {
    "id": 32,
    "operator": "Vi",
    "category": "Unlimited",
    "price": 549,
    "validity": "56 days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": [
      "1.5GB/day",
      "Unlimited calls",
      "Long validity"
    ]
  },
  {
    "id": 33,
    "operator": "Vi",
    "category": "Unlimited",
    "price": 999,
    "validity": "84 days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Long Validity",
    "benefits": [
      "2GB/day",
      "Unlimited calls",
      "Long validity"
    ]
  },
  {
    "id": 34,
    "operator": "Vi",
    "category": "Talktime",
    "price": 10,
    "validity": "NA",
    "data": "No",
    "calls": "₹7.50",
    "sms": "No",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime Recharge",
    "benefits": [
      "₹7.50 talktime"
    ]
  },
  {
    "id": 35,
    "operator": "Vi",
    "category": "Talktime",
    "price": 20,
    "validity": "NA",
    "data": "No",
    "calls": "₹14.95",
    "sms": "No",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime Recharge",
    "benefits": [
      "₹14.95 talktime"
    ]
  },
  {
    "id": 36,
    "operator": "Vi",
    "category": "Talktime",
    "price": 100,
    "validity": "NA",
    "data": "No",
    "calls": "₹75.00",
    "sms": "No",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime Recharge",
    "benefits": [
      "₹75.00 talktime"
    ]
  },
  {
    "id": 37,
    "operator": "BSNL",
    "category": "Popular",
    "price": 187,
    "validity": "28 days",
    "data": "1GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Best Value",
    "benefits": [
      "1GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 38,
    "operator": "BSNL",
    "category": "Popular",
    "price": 247,
    "validity": "28 days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": [
      "2GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 39,
    "operator": "BSNL",
    "category": "Popular",
    "price": 319,
    "validity": "28 days",
    "data": "2.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": [
      "2.5GB/day",
      "Unlimited calls",
      "100 SMS/day"
    ]
  },
  {
    "id": 40,
    "operator": "BSNL",
    "category": "Data Packs",
    "price": 29,
    "validity": "7 days",
    "data": "2GB",
    "calls": "No",
    "sms": "No",
    "type": "data",
    "popular": false,
    "highlight": "Extra Data Pack",
    "benefits": [
      "2GB data",
      "Works with active plan"
    ]
  },
  {
    "id": 41,
    "operator": "BSNL",
    "category": "Data Packs",
    "price": 97,
    "validity": "28 days",
    "data": "10GB",
    "calls": "No",
    "sms": "No",
    "type": "data",
    "popular": true,
    "highlight": "Extra Data Pack",
    "benefits": [
      "10GB data",
      "Works with active plan"
    ]
  },
  {
    "id": 42,
    "operator": "BSNL",
    "category": "Unlimited",
    "price": 485,
    "validity": "56 days",
    "data": "1GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": [
      "1GB/day",
      "Unlimited calls",
      "Long validity"
    ]
  },
  {
    "id": 43,
    "operator": "BSNL",
    "category": "Unlimited",
    "price": 797,
    "validity": "84 days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Long Validity",
    "benefits": [
      "2GB/day",
      "Unlimited calls",
      "Long validity"
    ]
  },
  {
    "id": 44,
    "operator": "BSNL",
    "category": "Talktime",
    "price": 10,
    "validity": "NA",
    "data": "No",
    "calls": "₹8.41",
    "sms": "No",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime Recharge",
    "benefits": [
      "₹8.41 talktime"
    ]
  },
  {
    "id": 45,
    "operator": "BSNL",
    "category": "Talktime",
    "price": 50,
    "validity": "28 days",
    "data": "No",
    "calls": "₹42.06",
    "sms": "No",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime Recharge",
    "benefits": [
      "₹42.06 talktime"
    ]
  },
  {
    "id": 46,
    "operator": "Airtel",
    "category": "Unlimited",
    "price": 2999,
    "validity": "365 days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Annual Plan",
    "benefits": [
      "2GB/day",
      "Unlimited calls",
      "1 Year validity"
    ]
  },
  {
    "id": 47,
    "operator": "Jio",
    "category": "Unlimited",
    "price": 2879,
    "validity": "365 days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Annual Plan",
    "benefits": [
      "2GB/day",
      "Unlimited calls",
      "1 Year validity"
    ]
  },
  {
    "id": 48,
    "operator": "Vi",
    "category": "Unlimited",
    "price": 3099,
    "validity": "365 days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Annual Plan",
    "benefits": [
      "1.5GB/day",
      "Unlimited calls",
      "1 Year validity"
    ]
  },
  {
    "id": 49,
    "operator": "BSNL",
    "category": "Unlimited",
    "price": 2399,
    "validity": "365 days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Annual Plan",
    "benefits": [
      "2GB/day",
      "Unlimited calls",
      "1 Year validity"
    ]
  },
  {
    "id": 50,
    "operator": "Airtel",
    "category": "Data Packs",
    "price": 251,
    "validity": "30 days",
    "data": "50GB",
    "calls": "No",
    "sms": "No",
    "type": "data",
    "popular": true,
    "highlight": "Mega Data Pack",
    "benefits": [
      "50GB data",
      "Works with active plan"
    ]
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/topify');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedPlans = async () => {
  try {
    await connectDB();
    
    // Clear existing plans
    await Plan.deleteMany({});
    console.log('Cleared existing plans');
    
    // Convert the data to match our schema
    const formattedPlans = professionalPlans.map(plan => ({
      operator: plan.operator,
      name: `${plan.operator} ${plan.price} Plan`,
      price: plan.price,
      validity: parseInt(plan.validity.split(' ')[0]) || 0, // Extract number from "28 days"
      data: plan.data,
      calls: plan.calls,
      sms: plan.sms,
      benefits: plan.benefits,
      isPopular: plan.popular,
      category: plan.category
    }));
    
    // Insert new plans
    await Plan.insertMany(formattedPlans);
    console.log(`Successfully seeded ${formattedPlans.length} professional plans`);
    
    // Display summary
    const summary = {};
    formattedPlans.forEach(plan => {
      if (!summary[plan.operator]) {
        summary[plan.operator] = {};
      }
      if (!summary[plan.operator][plan.category]) {
        summary[plan.operator][plan.category] = 0;
      }
      summary[plan.operator][plan.category]++;
    });
    
    console.log('\nPlans Summary:');
    Object.keys(summary).forEach(operator => {
      console.log(`${operator}:`);
      Object.keys(summary[operator]).forEach(category => {
        console.log(`  ${category}: ${summary[operator][category]} plans`);
      });
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding plans:', error);
    process.exit(1);
  }
};

seedPlans();