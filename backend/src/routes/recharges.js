const express = require('express');
const Recharge = require('../models/Recharge');
const Plan = require('../models/Plan');
const mongoose = require('mongoose');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create recharge
router.post('/', auth, async (req, res) => {
  try {
    const { phoneNumber, operator, planId, paymentMethod, amount } = req.body;
    
    console.log('Received recharge request:', { phoneNumber, operator, planId, paymentMethod, amount, userId: req.user._id });

    let planPrice = amount;
    let actualPlanId = null;

    // Try to find plan in database first if planId is a valid ObjectId
    if (planId && planId !== 'static-plan' && mongoose.Types.ObjectId.isValid(planId)) {
      try {
        const plan = await Plan.findById(planId);
        if (plan) {
          planPrice = plan.price;
          actualPlanId = planId;
        }
      } catch (err) {
        console.log('Error finding plan:', err.message);
      }
    }
    
    console.log('Processed recharge details:', { phoneNumber, operator, planId, actualPlanId, amount: planPrice, paymentMethod });

    // Check wallet balance if payment method is wallet
    if (paymentMethod === 'wallet') {
      if (req.user.walletBalance < planPrice) {
        return res.status(400).json({ message: 'Insufficient wallet balance' });
      }
    }

    const transactionId = 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9);

    const recharge = new Recharge({
      userId: req.user._id,
      phoneNumber,
      operator,
      planId: actualPlanId,
      amount: planPrice,
      transactionId,
      paymentMethod,
      status: 'success' // Simulate successful recharge
    });

    await recharge.save();
    console.log('Recharge saved successfully:', recharge._id);

    // Deduct from wallet if payment method is wallet
    if (paymentMethod === 'wallet') {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { walletBalance: -planPrice }
      });
      console.log('Wallet balance updated');
    }

    if (actualPlanId) {
      await recharge.populate('planId');
    }
    
    console.log('Sending recharge response:', recharge);
    res.status(201).json(recharge);
  } catch (error) {
    console.error('Recharge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user recharges
router.get('/my-recharges', auth, async (req, res) => {
  try {
    const recharges = await Recharge.find({ userId: req.user._id })
      .populate('planId')
      .sort({ createdAt: -1 });
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recharge by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const recharge = await Recharge.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('planId');
    
    if (!recharge) {
      return res.status(404).json({ message: 'Recharge not found' });
    }
    
    res.json(recharge);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;