const mongoose = require('mongoose');
require('dotenv').config();
const Plan = require('./models/Plan');

const plans = [
  {
    "operator": "Jio",
    "category": "Popular",
    "price": 199,
    "validity": "28 Days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": ["JioTV", "JioCinema", "JioCloud"]
  },
  {
    "operator": "Jio",
    "category": "Popular",
    "price": 299,
    "validity": "28 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Recommended",
    "benefits": ["JioTV", "JioCinema", "JioSaavn"]
  },
  {
    "operator": "Jio",
    "category": "Unlimited",
    "price": 666,
    "validity": "84 Days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": ["JioTV", "JioCinema", "JioCloud"]
  },
  {
    "operator": "Jio",
    "category": "Annual",
    "price": 2999,
    "validity": "365 Days",
    "data": "2.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Annual Plan",
    "benefits": ["JioTV", "JioCinema", "JioSaavn"]
  },
  {
    "operator": "Jio",
    "category": "Data Packs",
    "price": 61,
    "validity": "28 Days",
    "data": "6GB",
    "calls": "NA",
    "sms": "NA",
    "type": "data",
    "popular": false,
    "highlight": "Extra Data",
    "benefits": ["Data Booster"]
  },
  {
    "operator": "Airtel",
    "category": "Popular",
    "price": 199,
    "validity": "28 Days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": ["Airtel Xstream", "Wynk Music"]
  },
  {
    "operator": "Airtel",
    "category": "Popular",
    "price": 349,
    "validity": "28 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Recommended",
    "benefits": ["Airtel Xstream", "Apollo 24/7"]
  },
  {
    "operator": "Airtel",
    "category": "Unlimited",
    "price": 839,
    "validity": "84 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": ["Wynk Music", "Xstream"]
  },
  {
    "operator": "Airtel",
    "category": "Annual",
    "price": 1799,
    "validity": "365 Days",
    "data": "24GB",
    "calls": "Unlimited",
    "sms": "3600",
    "type": "prepaid",
    "popular": false,
    "highlight": "Annual Plan",
    "benefits": ["Xstream", "Wynk Music"]
  },
  {
    "operator": "Airtel",
    "category": "Data Packs",
    "price": 121,
    "validity": "30 Days",
    "data": "12GB",
    "calls": "NA",
    "sms": "NA",
    "type": "data",
    "popular": false,
    "highlight": "Extra Data",
    "benefits": ["High Speed Data"]
  },
  {
    "operator": "Vi",
    "category": "Popular",
    "price": 199,
    "validity": "28 Days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": ["Vi Movies", "Vi TV"]
  },
  {
    "operator": "Vi",
    "category": "Popular",
    "price": 299,
    "validity": "28 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Recommended",
    "benefits": ["Weekend Data Rollover"]
  },
  {
    "operator": "Vi",
    "category": "Unlimited",
    "price": 719,
    "validity": "84 Days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": ["Binge All Night"]
  },
  {
    "operator": "Vi",
    "category": "Annual",
    "price": 3099,
    "validity": "365 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Annual Plan",
    "benefits": ["Vi Movies", "Vi Games"]
  },
  {
    "operator": "Vi",
    "category": "Data Packs",
    "price": 58,
    "validity": "28 Days",
    "data": "3GB",
    "calls": "NA",
    "sms": "NA",
    "type": "data",
    "popular": false,
    "highlight": "Extra Data",
    "benefits": ["Data Booster"]
  },
  {
    "operator": "BSNL",
    "category": "Popular",
    "price": 187,
    "validity": "28 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": ["Free Caller Tunes"]
  },
  {
    "operator": "BSNL",
    "category": "Unlimited",
    "price": 397,
    "validity": "60 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": ["Free Roaming"]
  },
  {
    "operator": "BSNL",
    "category": "Annual",
    "price": 1999,
    "validity": "365 Days",
    "data": "600GB",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Annual Plan",
    "benefits": ["High Speed Data"]
  },
  {
    "operator": "BSNL",
    "category": "Data Packs",
    "price": 151,
    "validity": "30 Days",
    "data": "40GB",
    "calls": "NA",
    "sms": "NA",
    "type": "data",
    "popular": false,
    "highlight": "Extra Data",
    "benefits": ["Data Booster"]
  },
  {
    "operator": "BSNL",
    "category": "Talktime",
    "price": 100,
    "validity": "Unlimited",
    "data": "NA",
    "calls": "₹81 Talktime",
    "sms": "NA",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime",
    "benefits": ["No Expiry"]
  },
  {
    "operator": "Jio",
    "category": "Popular",
    "price": 149,
    "validity": "20 Days",
    "data": "1GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Recommended",
    "benefits": ["JioTV", "JioCinema"]
  },
  {
    "operator": "Jio",
    "category": "Unlimited",
    "price": 749,
    "validity": "90 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": ["JioTV", "JioCinema"]
  },
  {
    "operator": "Jio",
    "category": "Annual",
    "price": 3227,
    "validity": "365 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Annual Plan",
    "benefits": ["JioTV", "JioCinema", "JioSaavn"]
  },
  {
    "operator": "Jio",
    "category": "Data Packs",
    "price": 222,
    "validity": "30 Days",
    "data": "50GB",
    "calls": "NA",
    "sms": "NA",
    "type": "data",
    "popular": true,
    "highlight": "Extra Data",
    "benefits": ["High Speed Data"]
  },
  {
    "operator": "Jio",
    "category": "Talktime",
    "price": 50,
    "validity": "Unlimited",
    "data": "NA",
    "calls": "₹39.37 Talktime",
    "sms": "NA",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime",
    "benefits": ["No Expiry"]
  },
  {
    "operator": "Airtel",
    "category": "Popular",
    "price": 265,
    "validity": "28 Days",
    "data": "1GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": ["Wynk Music", "Xstream"]
  },
  {
    "operator": "Airtel",
    "category": "Unlimited",
    "price": 999,
    "validity": "84 Days",
    "data": "2.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Premium",
    "benefits": ["Xstream", "Apollo 24/7"]
  },
  {
    "operator": "Airtel",
    "category": "Annual",
    "price": 2999,
    "validity": "365 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Annual Plan",
    "benefits": ["Xstream", "Wynk Music"]
  },
  {
    "operator": "Airtel",
    "category": "Data Packs",
    "price": 301,
    "validity": "30 Days",
    "data": "50GB",
    "calls": "NA",
    "sms": "NA",
    "type": "data",
    "popular": false,
    "highlight": "Extra Data",
    "benefits": ["High Speed Data"]
  },
  {
    "operator": "Airtel",
    "category": "Talktime",
    "price": 500,
    "validity": "Unlimited",
    "data": "NA",
    "calls": "₹423.73 Talktime",
    "sms": "NA",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime",
    "benefits": ["No Expiry"]
  },
  {
    "operator": "Vi",
    "category": "Popular",
    "price": 179,
    "validity": "24 Days",
    "data": "1GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": ["Weekend Rollover"]
  },
  {
    "operator": "Vi",
    "category": "Unlimited",
    "price": 839,
    "validity": "84 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": ["Binge All Night"]
  },
  {
    "operator": "Vi",
    "category": "Annual",
    "price": 2899,
    "validity": "365 Days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Annual Plan",
    "benefits": ["Vi Movies", "Vi Games"]
  },
  {
    "operator": "Vi",
    "category": "Data Packs",
    "price": 418,
    "validity": "28 Days",
    "data": "100GB",
    "calls": "NA",
    "sms": "NA",
    "type": "data",
    "popular": true,
    "highlight": "Extra Data",
    "benefits": ["High Speed Data"]
  },
  {
    "operator": "Vi",
    "category": "Talktime",
    "price": 99,
    "validity": "Unlimited",
    "data": "NA",
    "calls": "₹82 Talktime",
    "sms": "NA",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime",
    "benefits": ["No Expiry"]
  },
  {
    "operator": "BSNL",
    "category": "Popular",
    "price": 153,
    "validity": "28 Days",
    "data": "1GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Recommended",
    "benefits": ["Free Caller Tunes"]
  },
  {
    "operator": "BSNL",
    "category": "Unlimited",
    "price": 797,
    "validity": "150 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": ["Free Roaming"]
  },
  {
    "operator": "BSNL",
    "category": "Annual",
    "price": 2399,
    "validity": "365 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Annual Plan",
    "benefits": ["Free Roaming"]
  },
  {
    "operator": "BSNL",
    "category": "Data Packs",
    "price": 251,
    "validity": "30 Days",
    "data": "70GB",
    "calls": "NA",
    "sms": "NA",
    "type": "data",
    "popular": false,
    "highlight": "Extra Data",
    "benefits": ["High Speed Data"]
  },
  {
    "operator": "BSNL",
    "category": "Talktime",
    "price": 200,
    "validity": "Unlimited",
    "data": "NA",
    "calls": "₹165 Talktime",
    "sms": "NA",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime",
    "benefits": ["No Expiry"]
  },
  {
    "operator": "Jio",
    "category": "Popular",
    "price": 259,
    "validity": "28 Days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": ["JioTV", "JioCinema"]
  },
  {
    "operator": "Airtel",
    "category": "Popular",
    "price": 299,
    "validity": "28 Days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Recommended",
    "benefits": ["Xstream", "Wynk Music"]
  },
  {
    "operator": "Vi",
    "category": "Popular",
    "price": 239,
    "validity": "28 Days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Best Value",
    "benefits": ["Weekend Rollover"]
  },
  {
    "operator": "BSNL",
    "category": "Popular",
    "price": 197,
    "validity": "30 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Recommended",
    "benefits": ["Free Caller Tunes"]
  },
  {
    "operator": "Jio",
    "category": "Unlimited",
    "price": 1299,
    "validity": "180 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Long Validity",
    "benefits": ["JioTV", "JioCinema"]
  },
  {
    "operator": "Airtel",
    "category": "Unlimited",
    "price": 1199,
    "validity": "180 Days",
    "data": "1.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": ["Wynk Music"]
  },
  {
    "operator": "Vi",
    "category": "Unlimited",
    "price": 1449,
    "validity": "180 Days",
    "data": "2GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": ["Binge All Night"]
  },
  {
    "operator": "BSNL",
    "category": "Unlimited",
    "price": 999,
    "validity": "180 Days",
    "data": "1GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": false,
    "highlight": "Long Validity",
    "benefits": ["Free Roaming"]
  },
  {
    "operator": "Jio",
    "category": "Data Packs",
    "price": 444,
    "validity": "30 Days",
    "data": "100GB",
    "calls": "NA",
    "sms": "NA",
    "type": "data",
    "popular": true,
    "highlight": "Extra Data",
    "benefits": ["High Speed Data"]
  },
  {
    "operator": "Airtel",
    "category": "Data Packs",
    "price": 401,
    "validity": "30 Days",
    "data": "100GB",
    "calls": "NA",
    "sms": "NA",
    "type": "data",
    "popular": true,
    "highlight": "Extra Data",
    "benefits": ["High Speed Data"]
  },
  {
    "operator": "Vi",
    "category": "Data Packs",
    "price": 351,
    "validity": "28 Days",
    "data": "100GB",
    "calls": "NA",
    "sms": "NA",
    "type": "data",
    "popular": true,
    "highlight": "Extra Data",
    "benefits": ["High Speed Data"]
  },
  {
    "operator": "BSNL",
    "category": "Data Packs",
    "price": 399,
    "validity": "30 Days",
    "data": "120GB",
    "calls": "NA",
    "sms": "NA",
    "type": "data",
    "popular": true,
    "highlight": "Extra Data",
    "benefits": ["High Speed Data"]
  },
  {
    "operator": "Jio",
    "category": "Talktime",
    "price": 100,
    "validity": "Unlimited",
    "data": "NA",
    "calls": "₹81.75 Talktime",
    "sms": "NA",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime",
    "benefits": ["No Expiry"]
  },
  {
    "operator": "Airtel",
    "category": "Talktime",
    "price": 100,
    "validity": "Unlimited",
    "data": "NA",
    "calls": "₹81.75 Talktime",
    "sms": "NA",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime",
    "benefits": ["No Expiry"]
  },
  {
    "operator": "Vi",
    "category": "Talktime",
    "price": 100,
    "validity": "Unlimited",
    "data": "NA",
    "calls": "₹82 Talktime",
    "sms": "NA",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime",
    "benefits": ["No Expiry"]
  },
  {
    "operator": "BSNL",
    "category": "Talktime",
    "price": 100,
    "validity": "Unlimited",
    "data": "NA",
    "calls": "₹82 Talktime",
    "sms": "NA",
    "type": "talktime",
    "popular": false,
    "highlight": "Talktime",
    "benefits": ["No Expiry"]
  },
  {
    "operator": "Jio",
    "category": "Annual",
    "price": 3999,
    "validity": "365 Days",
    "data": "3GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Premium",
    "benefits": ["JioTV", "JioCinema", "JioSaavn"]
  },
  {
    "operator": "Airtel",
    "category": "Annual",
    "price": 3999,
    "validity": "365 Days",
    "data": "3GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Premium",
    "benefits": ["Xstream", "Wynk Music"]
  },
  {
    "operator": "Vi",
    "category": "Annual",
    "price": 3999,
    "validity": "365 Days",
    "data": "3GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Premium",
    "benefits": ["Vi Movies", "Vi Games"]
  },
  {
    "operator": "BSNL",
    "category": "Annual",
    "price": 2999,
    "validity": "365 Days",
    "data": "2.5GB/day",
    "calls": "Unlimited",
    "sms": "100/day",
    "type": "prepaid",
    "popular": true,
    "highlight": "Annual Plan",
    "benefits": ["Free Roaming"]
  }
];

async function seedPlans() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing plans
    await Plan.deleteMany({});
    console.log('🗑️  Cleared existing plans');

    // Insert all 60 plans
    const insertedPlans = await Plan.insertMany(plans);
    console.log(`🎉 Successfully inserted ${insertedPlans.length} plans to MongoDB Atlas`);

    // Display summary
    const summary = {};
    insertedPlans.forEach(plan => {
      if (!summary[plan.operator]) {
        summary[plan.operator] = 0;
      }
      summary[plan.operator]++;
    });

    console.log('\n📊 Plans Summary:');
    Object.entries(summary).forEach(([operator, count]) => {
      console.log(`   ${operator}: ${count} plans`);
    });

    console.log('\n🚀 All 60 plans successfully sent to MongoDB Atlas database!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedPlans();