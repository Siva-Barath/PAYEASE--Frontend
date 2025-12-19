const express = require('express');
const Plan = require('../models/Plan');

const router = express.Router();

// Get all plans
router.get('/', async (req, res) => {
  try {
    const { operator, category } = req.query;
    const filter = {};
    
    if (operator) filter.operator = operator;
    if (category) filter.category = category;

    const plans = await Plan.find(filter).sort({ price: 1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get plan by ID
router.get('/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get popular plans
router.get('/popular/all', async (req, res) => {
  try {
    const plans = await Plan.find({ popular: true }).sort({ price: 1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;