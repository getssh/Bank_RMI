const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 8080;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200 // limit each IP to 200 requests per windowMs
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
  
  createDefaultAdmin();
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

// Routes
app.use('/api/bank', require('./routes/auth'));
app.use('/api/bank', require('./routes/bank'));
app.use('/api/bank/admin', require('./routes/admin'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Create default admin account
async function createDefaultAdmin() {
  try {
    const Account = require('./models/Account');
    const adminExists = await Account.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const adminAccount = new Account({
        username: 'admin',
        name: 'System Administrator',
        phone: '',
        accountType: 'business',
        role: 'admin',
        pin: 'admin123',
        balance: 0
      });
      
      await adminAccount.save();
      console.log('Default admin account created');
      console.log('Username: admin, PIN: admin123');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
