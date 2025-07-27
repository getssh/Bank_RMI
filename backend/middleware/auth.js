const jwt = require('jsonwebtoken');
const Account = require('../models/Account');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const account = await Account.findOne({ accountNumber: decoded.accountNumber });

    if (!account) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    req.account = account;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {});
    
    if (req.account.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed.' });
  }
};

module.exports = { auth, adminAuth }; 