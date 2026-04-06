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

## Screenshots

The following app screens are included in the project visuals:

- **Home Screen**
- **History Screen**
- **Add Expense Screen**
- **Budget Planner**
- **Analytics Screen**

Use these markdown references after saving the screenshot files under a `screenshots/` folder:

```md
![Home Screen](screenshots/home-screen.jpeg)
![History Screen](screenshots/history-screen.jpeg)
![Add Expense Screen](screenshots/add-expense.jpeg)
![Budget Planner](screenshots/budget-planner.jpeg)
![Analytics Screen](screenshots/analytics-screen.jpeg)
```

> Place your app screenshots in `screenshots/` and rename them as needed.

## Backend API

- `GET /api/transactions` - list all transactions
- `GET /api/transactions/:id` - get transaction by ID
- `POST /api/transactions` - create a new transaction
- `PUT /api/transactions/:id` - update a transaction
- `DELETE /api/transactions/:id` - remove a transaction
- `GET /api/analytics/summary` - get analytics summary data

## APK Download

- Download the app APK here: [Personal Finance Companion APK](https://example.com/PersonalFinanceCompanion.apk)

> Replace the above URL with your actual hosted APK link once available.

### Screenshot Reference

You can reference the local screenshot path in markdown if opening the README locally:

```md
![App Screenshot](c:/Users/lalit/Downloads/WhatsApp Image 2026-04-06 at 8.07.57 PM.jpeg)
```

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
