const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  operator: {
    type: String,
    required: true,
    enum: ['Jio', 'Airtel', 'Vi', 'BSNL']
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  validity: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  calls: {
    type: String,
    required: true
  },
  sms: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  popular: {
    type: Boolean,
    default: false
  },
  highlight: {
    type: String,
    required: true
  },
  benefits: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);