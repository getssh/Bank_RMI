const express = require('express');
const jwt = require('jsonwebtoken');
const Account = require('../models/Account');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, pin } = req.body;

    if (!username || !pin) {
      return res.status(400).json({ error: 'Username and PIN are required' });
    }

    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPinValid = await account.comparePin(pin);
    if (!isPinValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { accountNumber: account.accountNumber, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      accountNumber: account.accountNumber,
      name: account.name,
      role: account.role,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/createAccount', async (req, res) => {
  try {
    const { username, name, phone, accountType, pin } = req.body;

    if (!username || !name || !pin) {
      return res.status(400).json({ error: 'Username, name, and PIN are required' });
    }

    const existingAccount = await Account.findOne({ username });
    if (existingAccount) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const account = new Account({
      username,
      name,
      phone: phone || '',
      accountType: accountType || 'savings',
      pin
    });

    await account.save();

    const token = jwt.sign(
      { accountNumber: account.accountNumber, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      accountNumber: account.accountNumber,
      name: account.name,
      role: account.role,
      token
    });
  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 