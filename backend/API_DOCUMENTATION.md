# Bank API Documentation

## Base URL
```
http://localhost:8080/api/bank
```

## Authentication

### Login
**POST** `/login`

**Query Parameters:**
- `username` (string, required): User's username
- `pin` (string, required): User's PIN

**Response:**
```json
{
  "success": true,
  "accountNumber": 123456,
  "name": "John Doe",
  "role": "user",
  "token": "jwt_token_here"
}
```

**Error Response:**
```json
{
  "error": "Invalid credentials"
}
```

### Create Account
**POST** `/createAccount`

**Query Parameters:**
- `username` (string, required): Unique username
- `name` (string, required): Full name
- `phone` (string, optional): Phone number
- `accountType` (string, optional): 'savings', 'checking', 'business' (default: 'savings')
- `pin` (string, required): Account PIN

**Response:**
```json
{
  "success": true,
  "accountNumber": 123456,
  "name": "John Doe",
  "role": "user",
  "token": "jwt_token_here"
}
```

## Banking Operations

### Get Balance
**GET** `/balance`

**Query Parameters:**
- `accountNumber` (number, required): Account number

**Response:**
```json
1000
```

### Deposit
**POST** `/deposit`

**Query Parameters:**
- `accountNumber` (number, required): Account number
- `amount` (number, required): Amount to deposit

**Response:**
```json
{
  "success": true,
  "newBalance": 1500
}
```

### Withdraw
**POST** `/withdraw`

**Query Parameters:**
- `accountNumber` (number, required): Account number
- `amount` (number, required): Amount to withdraw

**Response:**
```json
{
  "success": true,
  "newBalance": 500
}
```

**Error Response (Insufficient Funds):**
```json
{
  "error": "Insufficient funds"
}
```

### Transfer
**POST** `/transfer`

**Query Parameters:**
- `fromAccount` (number, required): Source account number
- `toAccount` (number, required): Target account number
- `amount` (number, required): Amount to transfer

**Response:**
```json
{
  "success": true,
  "newBalance": 400,
  "transferredAmount": 100
}
```

### Get Transaction History
**GET** `/transactions`

**Query Parameters:**
- `accountNumber` (number, required): Account number

**Response:**
```json
[
  {
    "_id": "transaction_id",
    "accountNumber": 123456,
    "type": "deposit",
    "amount": 500,
    "targetAccount": null,
    "details": "Deposit of ETB 500",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "date": "1/15/2024"
  }
]
```

### Get Server Time
**GET** `/time`

**Response:**
```json
{
  "serverTime": "2024-01-15T10:30:00.000Z",
  "localTime": "1/15/2024, 10:30:00 AM"
}
```

## Admin Operations

### Get All Users
**GET** `/admin/users`

**Response:**
```json
[
  {
    "_id": "user_id",
    "accountNumber": 123456,
    "username": "john_doe",
    "name": "John Doe",
    "phone": "+1234567890",
    "accountType": "savings",
    "role": "user",
    "balance": 1000,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Get All Transactions
**GET** `/admin/transactions`

**Response:**
```json
[
  {
    "_id": "transaction_id",
    "accountNumber": 123456,
    "type": "deposit",
    "amount": 500,
    "targetAccount": null,
    "details": "Deposit of ETB 500",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "date": "1/15/2024"
  }
]
```

### Get System Statistics
**GET** `/admin/stats`

**Response:**
```json
{
  "totalUsers": 10,
  "totalTransactions": 50,
  "totalBalance": 15000,
  "recentTransactions": [...]
}
```

## Health Check

### Server Health
**GET** `/health`

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "database": "Connected"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Account number and amount are required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "error": "Account not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Server error"
}
```

## Rate Limiting

The API implements rate limiting:
- 100 requests per 15 minutes per IP address
- Exceeded limit returns 429 Too Many Requests

## CORS

The API supports CORS for cross-origin requests from the frontend application.

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Data Types

- **Account Numbers**: 6-digit integers
- **Amounts**: Numbers (floating point for currency)
- **Timestamps**: ISO 8601 format
- **PINs**: Hashed strings (never returned in responses) 