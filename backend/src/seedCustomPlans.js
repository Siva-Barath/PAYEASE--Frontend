const mongoose = require('mongoose');
const Plan = require('./models/Plan');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/topify');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const customPlans = [
  {
    "id": 1,
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
    "id": 2,
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
    "id": 3,
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
    "id": 4,
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
    "id": 5,
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
    "id": 6,
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
    "id": 7,
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
    "id": 8,
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
    "id": 9,
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
    "id": 10,
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
    "id": 11,
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
    "id": 12,
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
    "id": 13,
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
    "id": 14,
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
    "id": 15,
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
    "id": 16,
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
    "id": 17,
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
    "id": 18,
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
    "id": 19,
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
    "id": 20,
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
    "id": 21,
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
    "id": 22,
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
    "id": 23,
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
    "id": 24,
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
    "id": 25,
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
    "id": 26,
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
    "id": 27,
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
    "id": 28,
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
    "id": 29,
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
    "id": 30,
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
    "id": 31,
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
    "id": 32,
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
    "id": 33,
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
    "id": 34,
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
    "id": 35,
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
    "id": 36,
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
    "id": 37,
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
    "id": 38,
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
    "id": 39,
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
    "id": 40,
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
    "id": 41,
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
    "id": 42,
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
    "id": 43,
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
    "id": 44,
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
    "id": 45,
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
    "id": 46,
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
    "id": 47,
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
    "id": 48,
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
    "id": 49,
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
    "id": 50,
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
    "id": 51,
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
    "id": 52,
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
    "id": 53,
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
    "id": 54,
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
    "id": 55,
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
    "id": 56,
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
    "id": 57,
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
    "id": 58,
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
    "id": 59,
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
    "id": 60,
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

const seedCustomPlans = async () => {
  try {
    await connectDB();
    
    // Clear existing plans
    await Plan.deleteMany({});
    console.log('Cleared all existing plans');
    
    // Convert the data to match our schema
    const formattedPlans = customPlans.map(plan => {
      // Map categories properly
      let category = plan.category;
      if (category === 'Data Packs') category = 'Data Packs';
      else if (category === 'Popular') category = 'Popular';
      else if (category === 'Unlimited') category = 'Unlimited';
      else if (category === 'Annual') category = 'Annual';
      else if (category === 'Talktime') category = 'Talktime';
      
      return {
        operator: plan.operator,
        name: `${plan.operator} ${plan.price} Plan`,
        price: plan.price,
        validity: parseInt(plan.validity.split(' ')[0]) || 0, // Extract number from "28 Days"
        data: plan.data,
        calls: plan.calls,
        sms: plan.sms,
        benefits: plan.benefits,
        isPopular: plan.popular,
        category: category,
        highlight: plan.highlight,
        type: plan.type
      };
    });
    
    // Insert new plans
    await Plan.insertMany(formattedPlans);
    console.log(`Successfully seeded ${formattedPlans.length} custom plans`);
    
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
    console.error('Error seeding custom plans:', error);
    process.exit(1);
  }
};

seedCustomPlans();