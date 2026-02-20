# 🔐 JWT Auth Frontend

> A modern **React + Vite** frontend with JWT authentication — Login, Register, and Protected Dashboard connected to Django REST API.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router-6.x-CA4245?style=for-the-badge&logo=reactrouter)

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Features](#pages--features)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Related Repository](#related-repository)

---

## 📖 About The Project

This is the **frontend UI** for a JWT authentication system built with React and Vite. It connects to a Django REST Framework backend and handles:

- ✅ User Registration
- ✅ User Login with JWT tokens
- ✅ Protected Dashboard (only for logged-in users)
- ✅ Auto token attachment on every API request
- ✅ Persistent login via localStorage
- ✅ Logout functionality

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool & Dev Server |
| React Router DOM | Page Routing |
| Axios | API Requests to Django |
| Context API | Global Auth State Management |
| localStorage | Token & User Persistence |

---

## 📁 Project Structure

```
jwt-auth-frontend/
├── src/
│   ├── api/
│   │   └── axios.js              ← Axios instance with base URL & token interceptor
│   ├── context/
│   │   └── AuthContext.jsx       ← Global auth state (login, register, logout)
│   ├── hooks/
│   │   └── useAuth.js            ← Custom hook to access auth context
│   ├── components/
│   │   ├── Navbar.jsx            ← Top navigation bar
│   │   └── ProtectedRoute.jsx    ← Route guard for logged-in users only
│   ├── pages/
│   │   ├── Login.jsx             ← Login page
│   │   ├── Register.jsx          ← Register page
│   │   └── Dashboard.jsx         ← Protected dashboard page
│   ├── App.jsx                   ← Main router setup
│   ├── main.jsx                  ← App entry point
│   └── index.css                 ← Global styles
├── .gitignore
├── package.json
├── vite.config.js
└── index.html
```

---

## 📄 Pages & Features

| Page | URL | Access | Description |
|---|---|---|---|
| Login | `/login` | Everyone | Login with username & password |
| Register | `/register` | Everyone | Create a new account |
| Dashboard | `/dashboard` | Logged in only | Shows user profile fetched from API |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- Node.js 18+
- npm
- Django backend running at `http://127.0.0.1:8000`

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/saif321761/jwt-auth-frontend.git
cd jwt-auth-frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

App runs at: `http://localhost:5173`

> ⚠️ Make sure your Django backend is running at `http://127.0.0.1:8000` before using the app.

---

## ⚙️ How It Works

### Token Flow
```
User fills Login form
      ↓
POST /api/auth/login/ → Django returns access + refresh tokens
      ↓
GET /api/auth/profile/ → fetch user data with token
      ↓
Tokens & user saved in localStorage
      ↓
Every API request auto-attaches: Authorization: Bearer <token>
      ↓
User redirected to Dashboard ✅
```

### Protected Route
```
User visits /dashboard
      ↓
ProtectedRoute checks: is user logged in?
      ↓
NO  → redirect to /login
YES → show Dashboard ✅
```

### localStorage Keys

| Key | Value | Purpose |
|---|---|---|
| `access` | JWT access token | Sent with every API request |
| `refresh` | JWT refresh token | Get new access token when expired |
| `user` | JSON user object | Show username, check login status |

---

## 🔗 Related Repository

> Backend repo (Django REST Framework):  
> 👉 [jwt-auth-backend](https://github.com/saif321761/jwt-auth-backend)

---

## 👨‍💻 Author

**Saif** — [@saif321761](https://github.com/saif321761)