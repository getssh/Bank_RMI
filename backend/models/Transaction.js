const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true,
    ref: 'Account'
  },
  type: {
    type: String,
    enum: ['deposit', 'withdraw', 'transfer'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  targetAccount: {
    type: Number,
    ref: 'Account'
  },
  details: {
    type: String,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

transactionSchema.virtual('date').get(function() {
  return this.timestamp.toLocaleDateString();
});

transactionSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Transaction', transactionSchema); 