const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Plan = require('../models/Plan');

const router = express.Router();

// Admin login
router.post('/login', [
  body('email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    let admin = await Admin.findOne({ email });
    if (!admin) {
      // Create default admin if doesn't exist
      admin = new Admin({ email: 'admin@gmail.com', password: 'admin123' });
      await admin.save();
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ adminId: admin._id, role: 'admin' }, process.env.JWT_SECRET || 'fallback-secret');

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all plans (admin only)
router.get('/plans', async (req, res) => {
  try {
    const plans = await Plan.find({}).sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all recharges (admin only)
router.get('/recharges', async (req, res) => {
  try {
    const Recharge = require('../models/Recharge');
    const recharges = await Recharge.find({})
      .populate('userId', 'name phone email')
      .populate('planId')
      .sort({ createdAt: -1 });
    res.json(recharges);
  } catch (error) {
    console.error('Get recharges error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard stats (admin only)
router.get('/stats', async (req, res) => {
  try {
    const User = require('../models/User');
    const Plan = require('../models/Plan');
    const Recharge = require('../models/Recharge');
    
    const totalUsers = await User.countDocuments();
    const totalPlans = await Plan.countDocuments();
    const totalRecharges = await Recharge.countDocuments();
    const totalRevenue = await Recharge.aggregate([
      { $match: { status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const recentUsers = await User.find({}).sort({ createdAt: -1 }).limit(10).select('-password');
    const recentRecharges = await Recharge.find({}).populate('userId', 'name phone').sort({ createdAt: -1 }).limit(10);
    
    res.json({
      totalUsers,
      totalPlans,
      totalRecharges,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentUsers,
      recentRecharges
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all recharges (admin only)
router.get('/recharges', async (req, res) => {
  try {
    const Recharge = require('../models/Recharge');
    const recharges = await Recharge.find({}).populate('userId', 'name email phone').sort({ createdAt: -1 });
    res.json(recharges);
  } catch (error) {
    console.error('Get recharges error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new plan (admin only)
router.post('/plans', [
  body('name').notEmpty().withMessage('Plan name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('validity').notEmpty().withMessage('Validity is required'),
  body('data').notEmpty().withMessage('Data is required'),
  body('operator').notEmpty().withMessage('Operator is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    console.error('Add plan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update plan (admin only)
router.put('/plans/:id', async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json(plan);
  } catch (error) {
    console.error('Update plan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete plan (admin only)
router.delete('/plans/:id', async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Delete plan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;