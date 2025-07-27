const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true,
    unique: true,
    default: function() {
      return Math.floor(100000 + Math.random() * 900000);
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  accountType: {
    type: String,
    enum: ['savings', 'checking', 'business'],
    default: 'savings'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'admin'
  },
  pin: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

accountSchema.pre('save', async function(next) {
  if (this.isModified('pin')) {
    const bcrypt = require('bcryptjs');
    this.pin = await bcrypt.hash(this.pin, 10);
  }
  next();
});

accountSchema.methods.comparePin = async function(candidatePin) {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(candidatePin, this.pin);
};

module.exports = mongoose.model('Account', accountSchema); 