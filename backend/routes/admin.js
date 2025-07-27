const express = require('express');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const { adminAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await Account.find({}, { pin: 0 })
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .sort({ timestamp: -1 })
      .limit(100);

    res.json(transactions);
  } catch (error) {
    console.error('Get all transactions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await Account.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const totalBalance = await Account.aggregate([
      { $group: { _id: null, total: { $sum: '$balance' } } }
    ]);

    const recentTransactions = await Transaction.find({})
      .sort({ timestamp: -1 })
      .limit(10);

    res.json({
      totalUsers,
      totalTransactions,
      totalBalance: totalBalance[0]?.total || 0,
      recentTransactions
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 