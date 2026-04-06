# 📱 Personal Finance Companion

A modern and user-friendly **Personal Finance Tracker App** built using **React Native (Expo)** and **Node.js + MongoDB**.
This app helps users manage income, expenses, budgets, and analyze spending habits in real-time.

---

## 🚀 Features

* 💰 Add, edit, and delete income & expense transactions
* 📊 View analytics with charts and insights
* 🧾 Track transaction history with filters
* 🎯 Budget planner for different categories
* ⚡ Real-time UI updates
* 🎨 Clean and modern UI design

---

## 📥 Download APK

👉 **[Download App](https://your-apk-link.com)**

> Replace this link with your actual APK link (Google Drive / Firebase / Hosting)

---

## 📸 App Screenshots

### 🏠 Home Screen

![Home](screenshots/homescreen.png)

### 📜 Transaction History

![History](screenshots/history.jpeg)

### 📊 Analytics Screen

![Analytics](screenshots/analytics.jpeg)

### 💰 Budget Planner

![Budget](screenshots/budget.jpeg)

### 🎯 Goal Planner

![Goal](screenshots/goal.jpeg)

### ➕ Add Expense

![Add Expense](screenshots/add-expense.jpeg)

### ➕ Add Income

![Add Income](screenshots/add-income.jpeg)

---

## 🛠 Tech Stack

### 📱 Frontend

* React Native (Expo)
* React Navigation
* Context API
* React Native Chart Kit

### 🌐 Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## 📂 Project Structure

```
Personal-Finance-Companion/
│
├── frontend/                 # React Native App
│   ├── screens/
│   ├── navigation/
│   ├── context/
│   └── styles/
│
├── backend/                 # Express Server
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── config/
│
├── screenshots/             # App UI Images
└── README.md
```

---

## ⚙️ Run Locally

### 🔹 Backend Setup

```bash
cd backend
npm install
npm start
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🌐 API Endpoints

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | /api/transactions      | Get all transactions |
| POST   | /api/transactions      | Add transaction      |
| PUT    | /api/transactions/:id  | Update transaction   |
| DELETE | /api/transactions/:id  | Delete transaction   |
| GET    | /api/analytics/summary | Get analytics data   |

---

## ⚠️ Important Notes

* Ensure backend is running before starting frontend
* Update API URL in:

  ```
  frontend/context/FinanceContext.js
  ```
* Use your **local IP instead of localhost**

Example:

```js
const BASE_URL = "http://192.168.X.X:5000";
```

---

## 🚀 Future Improvements

* 🔐 User authentication (Login/Signup)
* ☁️ Cloud sync & backup
* 📊 Advanced analytics & AI insights
* 🌙 Dark mode support

---

## 👨‍💻 Author

**Lalit Singh**
📍 Bhubaneswar, India

---

## ⭐ Support

If you like this project:

⭐ Star this repository
🍴 Fork it
📢 Share with others

---

## 📄 License

This project is open-source and available under the **MIT License**.
