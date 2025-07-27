# Bank MERN Application

A complete banking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

### Frontend (React)
- **Landing Page**: Welcome page with navigation
- **User Authentication**: Login and registration forms
- **Dashboard**: Account overview with balance display
- **Banking Operations**: Deposit, withdraw, and transfer funds
- **Transaction History**: View all account transactions
- **Admin Panel**: Manage all users and view system transactions
- **Real-time Features**: Server time and currency exchange rates
- **Responsive Design**: Modern UI with Tailwind CSS

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Complete banking operations
- **MongoDB Database**: NoSQL database with Mongoose ODM
- **JWT Authentication**: Secure token-based authentication
- **Security Features**: PIN hashing, rate limiting, input validation
- **Admin Functions**: User and transaction management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd Bank_RMI
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit config.env file with your MongoDB URI and JWT secret
cp config.env.example config.env

# Test MongoDB connection
npm run test-connection

# Start the server
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend
cd bank-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/health

## Environment Configuration

### Backend (.env file)
```env
MONGODB_URI=mongodb://localhost:27017/bankdb
JWT_SECRET=your_secure_jwt_secret_here
PORT=8080
```

### Frontend API Configuration
The frontend is configured to connect to `http://localhost:8080/api/bank` by default.

## Default Accounts

### Admin Account
- **Username**: `admin`
- **PIN**: `admin123`
- **Role**: Administrator

### Test User Account
Create a new account through the registration page or use the API.

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

### Admin
- `GET /api/bank/admin/users` - Get all users
- `GET /api/bank/admin/transactions` - Get all transactions
- `GET /api/bank/admin/stats` - Get system statistics

## Database Schema

### Account Collection
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
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Collection
```javascript
{
  accountNumber: Number,   // Source account
  type: String,           // 'deposit', 'withdraw', 'transfer'
  amount: Number,         // Transaction amount
  targetAccount: Number,  // Target account (for transfers)
  details: String,        // Transaction description
  timestamp: Date,        // Transaction time
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- **PIN Hashing**: All PINs are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents abuse with request limiting
- **Input Validation**: All inputs are validated and sanitized
- **CORS**: Configured for cross-origin requests

## Development

### Project Structure
```
Bank_RMI/
├── backend/              # Node.js + Express backend
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API route handlers
│   ├── middleware/      # Custom middleware
│   ├── server.js        # Main server file
│   └── package.json     # Backend dependencies
├── bank-frontend/        # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── api/         # API integration
│   │   └── App.jsx      # Main app component
│   └── package.json     # Frontend dependencies
└── README.md            # This file
```

### Running in Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd bank-frontend
npm run dev
```

## Production Deployment

### Backend
1. Set secure environment variables
2. Use a production MongoDB instance (MongoDB Atlas)
3. Configure proper CORS settings
4. Set up SSL/TLS certificates
5. Use a process manager like PM2

### Frontend
1. Build the production version: `npm run build`
2. Deploy to a static hosting service (Netlify, Vercel, etc.)
3. Update API endpoints to production URLs

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or use MongoDB Atlas
- Check the MONGODB_URI in config.env
- Run `npm run test-connection` to verify connection

### Frontend API Issues
- Ensure backend is running on port 8080
- Check CORS configuration
- Verify API endpoints in bankApi.js

### Common Issues
- **Port already in use**: Change PORT in config.env
- **MongoDB connection failed**: Check MongoDB service status
- **JWT errors**: Verify JWT_SECRET is set

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details