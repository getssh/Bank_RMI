const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log('Database:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    
    const testCollection = mongoose.connection.collection('test');
    await testCollection.insertOne({ test: 'connection', timestamp: new Date() });
    console.log('✅ Database write test successful!');
    
    await testCollection.deleteOne({ test: 'connection' });
    console.log('✅ Database cleanup successful!');
    
    await mongoose.disconnect();
    console.log('✅ Connection closed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

testConnection(); 