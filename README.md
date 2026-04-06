# Personal Finance Companion

A simple personal finance tracker built with a React Native Expo frontend and an Express/MongoDB backend.

## Project Structure

- `frontend/` - React Native Expo mobile app
  - `App.js` - app entry point
  - `navigation/` - app navigation setup
  - `screens/` - UI screens for income, expense, goals, history, analytics, and budget
  - `context/FinanceContext.js` - shared transaction state and API sync logic

- `backend/` - Express API server
  - `server.js` - entry point and serverless export
  - `routes/` - API routes for transactions and analytics
  - `controllers/` - route handlers for transaction management and analytics
  - `models/Transaction.js` - MongoDB transaction schema
  - `config/db.js` - database connection logic

## Features

- Add, edit, and delete income and expense transactions
- Track transaction categories, notes, date/time, and amounts
- View analytics and budget insights
- Auto-refresh transaction data from backend
- Local state updates for instant UI response

## Backend API

- `GET /api/transactions` - list all transactions
- `GET /api/transactions/:id` - get transaction by ID
- `POST /api/transactions` - create a new transaction
- `PUT /api/transactions/:id` - update a transaction
- `DELETE /api/transactions/:id` - remove a transaction
- `GET /api/analytics/summary` - get analytics summary data

## Run Locally

### Backend

1. Copy `.env` with `MONGO_URI` set to your MongoDB connection string.
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start Expo:
   ```bash
   npm start
   ```

> The frontend currently fetches transactions from a locally configured backend address in `frontend/context/FinanceContext.js`.

## Notes

- The backend is prepared for serverless deployment with a serverless export in `backend/server.js`.
- The frontend is built with Expo and uses React Navigation, Async Storage, and native date/time picker.
