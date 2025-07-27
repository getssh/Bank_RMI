# Bank MERN Backend

A complete MERN stack backend for a banking application with MongoDB, Express.js, and Node.js.

## Features

- **User Authentication**: Login and account creation with JWT tokens
- **Account Management**: Create and manage bank accounts
- **Banking Operations**: Deposit, withdraw, and transfer funds
- **Transaction History**: Track all account transactions
- **Admin Panel**: View all users and transactions (admin only)
- **Security**: PIN hashing, rate limiting, and input validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables**:
   - Copy `config.env` and update the values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bankdb
   JWT_SECRET=your_secure_jwt_secret_here
   PORT=8080
   ```

3. **Start MongoDB**:
   - Local: `mongod`
   - Or use MongoDB Atlas cloud service

4. **Run the server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/bank/login` - User login
- `POST /api/bank/createAccount` - Create new account

### Banking Operations
- `GET /api/bank/balance` - Get account balance
- `POST /api/bank/deposit` - Deposit funds
- `POST /api/bank/withdraw` - Withdraw funds
- `POST /api/bank/transfer` - Transfer between accounts
- `GET /api/bank/transactions` - Get transaction history
- `GET /api/bank/time` - Get server time

### Admin (Admin role required)
- `GET /api/bank/admin/users` - Get all users
- `GET /api/bank/admin/transactions` - Get all transactions
- `GET /api/bank/admin/stats` - Get system statistics

### Health Check
- `GET /health` - Server health status

## Database Schema

### Account Model
```javascript
{
  accountNumber: Number,    // 6-digit unique number
  username: String,         // Unique username
  name: String,            // Full name
  phone: String,           // Phone number
  accountType: String,     // 'savings', 'checking', 'business'
  role: String,           // 'user', 'admin'
  pin: String,            // Hashed PIN
  balance: Number,        // Current balance
  timestamps: true
}
```

### Transaction Model
```javascript
{
  accountNumber: Number,   // Source account
  type: String,           // 'deposit', 'withdraw', 'transfer'
  amount: Number,         // Transaction amount
  targetAccount: Number,  // Target account (for transfers)
  details: String,        // Transaction description
  timestamp: Date         // Transaction time
}
```

## Default Admin Account

The system automatically creates a default admin account:
- **Username**: `admin`
- **PIN**: `admin123`
- **Role**: `admin`

**Important**: Change the default admin credentials in production!

## Security Features

- **PIN Hashing**: All PINs are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents abuse with request limiting
- **Input Validation**: All inputs are validated and sanitized
- **CORS**: Configured for cross-origin requests

## Error Handling

The API returns consistent error responses:
```json
{
  "error": "Error message description"
}
```

## Development

### Project Structure
```
backend/
├── models/          # MongoDB schemas
├── routes/          # API route handlers
├── middleware/      # Custom middleware
├── server.js        # Main server file
├── package.json     # Dependencies
└── config.env       # Environment variables
```

### Running Tests
```bash
# Add test scripts to package.json
npm test
```

## Production Deployment

1. Set secure environment variables
2. Use a production MongoDB instance
3. Configure proper CORS settings
4. Set up SSL/TLS certificates
5. Use a process manager like PM2

## License

MIT License 