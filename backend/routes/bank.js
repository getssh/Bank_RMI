const express = require('express');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const { auth } = require('../middleware/auth');
const router = express.Router();


router.get('/balance', async (req, res) => {
  try {
    const { accountNumber } = req.query;

    if (!accountNumber) {
      return res.status(400).json({ error: 'Account number is required' });
    }

    const account = await Account.findOne({ accountNumber });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json(account.balance);
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/deposit', async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    if (!accountNumber || !amount) {
      return res.status(400).json({ error: 'Account number and amount are required' });
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const account = await Account.findOne({ accountNumber });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    account.balance += numAmount;
    await account.save();


    const transaction = new Transaction({
      accountNumber: parseInt(accountNumber),
      type: 'deposit',
      amount: numAmount,
      details: `Deposit of ETB ${numAmount}`
    });
    await transaction.save();

    res.json({ success: true, newBalance: account.balance });
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/withdraw', async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    if (!accountNumber || !amount) {
      return res.status(400).json({ error: 'Account number and amount are required' });
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const account = await Account.findOne({ accountNumber });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    if (account.balance < numAmount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    account.balance -= numAmount;
    await account.save();


    const transaction = new Transaction({
      accountNumber: parseInt(accountNumber),
      type: 'withdraw',
      amount: numAmount,
      details: `Withdrawal of ETB ${numAmount}`
    });
    await transaction.save();

    res.json({ success: true, newBalance: account.balance });
  } catch (error) {
    console.error('Withdraw error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/transfer', async (req, res) => {
  try {
    const { fromAccount, toAccount, amount } = req.body;

    if (!fromAccount || !toAccount || !amount) {
      return res.status(400).json({ error: 'From account, to account, and amount are required' });
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    if (fromAccount === toAccount) {
      return res.status(400).json({ error: 'Cannot transfer to the same account' });
    }

    const fromAccountDoc = await Account.findOne({ accountNumber: parseInt(fromAccount) });
    const toAccountDoc = await Account.findOne({ accountNumber: parseInt(toAccount) });

    if (!fromAccountDoc) {
      return res.status(404).json({ error: 'From account not found' });
    }

    if (!toAccountDoc) {
      return res.status(404).json({ error: 'To account not found' });
    }

    if (fromAccountDoc.balance < numAmount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }


    fromAccountDoc.balance -= numAmount;
    toAccountDoc.balance += numAmount;

    await fromAccountDoc.save();
    await toAccountDoc.save();


    const fromTransaction = new Transaction({
      accountNumber: parseInt(fromAccount),
      type: 'transfer',
      amount: numAmount,
      targetAccount: parseInt(toAccount),
      details: `Transfer of ETB ${numAmount} to account ${toAccount}`
    });

    const toTransaction = new Transaction({
      accountNumber: parseInt(toAccount),
      type: 'transfer',
      amount: numAmount,
      targetAccount: parseInt(fromAccount),
      details: `Received ETB ${numAmount} from account ${fromAccount}`
    });

    await fromTransaction.save();
    await toTransaction.save();

    res.json({ 
      success: true, 
      newBalance: fromAccountDoc.balance,
      transferredAmount: numAmount
    });
  } catch (error) {
    console.error('Transfer error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/transactions', async (req, res) => {
  try {
    const { accountNumber } = req.query;

    if (!accountNumber) {
      return res.status(400).json({ error: 'Account number is required' });
    }

    const transactions = await Transaction.find({ accountNumber: parseInt(accountNumber) })
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(transactions);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/time', (req, res) => {
  const now = new Date();
  res.json({
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    dateTime: now.toLocaleString(),
    timestamp: now.toISOString()
  });
});

module.exports = router; 