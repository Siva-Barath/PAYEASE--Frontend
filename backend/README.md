# TOPIFY Backend API

A complete Node.js backend with JWT authentication for the TOPIFY mobile recharge application.

## Features

- 🔐 JWT Authentication (Login/Register)
- 👤 User Management
- 📱 Mobile Recharge Plans
- 💰 Wallet System
- 📊 Transaction History
- 🛡️ Secure API Endpoints

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (already configured in `.env`)

4. Seed the database with sample plans:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

Or use the automated startup script:
```bash
start.bat
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with phone number
- `POST /api/auth/login-email` - Login with email/password

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Plans
- `GET /api/plans` - Get all plans (with filters)
- `GET /api/plans/:id` - Get plan by ID
- `GET /api/plans/popular/all` - Get popular plans

### Recharges
- `POST /api/recharges` - Create new recharge (protected)
- `GET /api/recharges/my-recharges` - Get user recharges (protected)
- `GET /api/recharges/:id` - Get recharge by ID (protected)

### Wallet
- `GET /api/wallet/balance` - Get wallet balance (protected)
- `POST /api/wallet/add-money` - Add money to wallet (protected)

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Sample Data

The database is seeded with plans for:
- Jio (3 plans)
- Airtel (3 plans) 
- Vi (2 plans)
- BSNL (2 plans)

## Environment Variables

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/topify
JWT_SECRET=topify_super_secret_jwt_key_2024_secure
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Health Check

Visit `http://localhost:3001/health` to verify the server is running.

## Development

- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data