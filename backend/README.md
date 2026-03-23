# Project Risk Tracker - Production Ready Setup

## Overview
This is a full-stack authentication system with:
- **Frontend**: HTML/CSS/JavaScript with Tailwind CSS
- **Backend**: Node.js + Express + MongoDB Atlas
- **Authentication**: JWT tokens + bcrypt password hashing

## 🚀 Setup Instructions

### 1️⃣ Backend Setup

#### Step 1: Install Node.js
Download from [nodejs.org](https://nodejs.org/)

#### Step 2: Install Dependencies
```bash
cd backend
npm install
```

#### Step 3: Configure Environment
Edit `.env` file in the `backend` folder:

```env
MONGODB_URI=mongodb+srv://bharathgunnisetti53_db_user:YOUR_PASSWORD@projectrisktracker.z1s3gjk.mongodb.net/risktracker
JWT_SECRET=your_secure_secret_key_change_this_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

**Replace `YOUR_PASSWORD`** with your MongoDB Atlas password.

#### Step 4: Start Backend Server
```bash
npm start
```

You should see:
```
✓ MongoDB Connected
✓ Server running on http://localhost:5000
✓ API Base: http://localhost:5000/api
```

### 2️⃣ Frontend Setup

The frontend is in `frontend/riskguard.html`

**Open the file in your browser** or use any local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server frontend
```

Then navigate to `http://localhost:8000/riskguard.html`

### 3️⃣ Test Authentication

#### Option A: Create a Mock Test User (for demo purposes)
In MongoDB Compass or Atlas, insert a test user manually, BUT it's better to:

#### Option B: Sign Up a New User
1. Click "Sign Up" on the frontend
2. Fill in: Name, Email, Password
3. Submit - user is saved to MongoDB with hashed password
4. Login with same credentials

#### Option C: Use the Demo Login Button
Click the demo button at the bottom (if configured with a seeded user)

---

## 📋 API Endpoints

### POST /api/auth/signup
**Create a new user account**

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response (201):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### POST /api/auth/login
**Login with email and password**

Request:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### GET /api/auth/me
**Get current user (requires JWT token)**

Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response (200):
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 🔐 Security Features

✅ **Password Hashing**: Using bcryptjs (10 salt rounds)  
✅ **JWT Tokens**: 7-day expiration  
✅ **Email Uniqueness**: Unique constraint on MongoDB  
✅ **Input Validation**: Server-side validation on all endpoints  
✅ **CORS Enabled**: Cross-Origin Resource Sharing  
✅ **No Password Storage**: Passwords never stored/logged  

---

## 📦 Deployment Guide

### Option 1: Deploy Backend on Render

1. **Create Render Account**: [render.com](https://render.com)
2. **Connect GitHub Repository**
3. **Create New Web Service**
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. **Set Environment Variables** in Render dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Strong secret key
   - `JWT_EXPIRE`: `7d`
   - `NODE_ENV`: `production`

7. **Get your Render URL** (e.g., `https://your-app.render.com`)

### Option 2: Deploy Backend on Railway

1. **Create Railway Account**: [railway.app](https://railway.app)
2. **Connect GitHub**
3. **Add MongoDB environment variables**
4. **Deploy** - Railway auto-detects Node.js

### Frontend Deployment

1. **Update Backend URL** in `riskguard.html`:
   ```javascript
   const API_BASE_URL = 'https://your-deployed-backend.render.com/api';
   // Instead of: const API_BASE_URL = 'http://localhost:5000/api';
   ```

2. **Deploy to Vercel, Netlify, or GitHub Pages**:
   - Upload `frontend/riskguard.html` 
   - Or use `npm install -g vercel && vercel`

---

## 🛠️ Troubleshooting

### "Cannot connect to MongoDB"
- Check `.env` file has correct `MONGODB_URI`
- Verify MongoDB Atlas IP whitelist includes your IP
- Test URL in MongoDB Compass

### "Backend not responding"
- Make sure backend server is running: `npm start`
- Check if running on port 5000
- Verify firewall isn't blocking port 5000

### "Invalid credentials" error
- Email must match exactly (case-insensitive but trimmed)
- Password must be correct
- Check user exists in MongoDB

### CORS errors
- Backend already has CORS enabled
- Make sure `API_BASE_URL` matches your backend origin

---

## 📁 Project Structure

```
project-risk-tracker/
├── frontend/
│   ├── riskguard.html          # Main frontend app
│   └── playground-1.mongodb.js  # MongoDB test file
├── backend/
│   ├── server.js               # Express server
│   ├── package.json            # Dependencies
│   ├── .env                    # Environment config
│   ├── models/
│   │   └── User.js            # MongoDB User schema
│   ├── routes/
│   │   └── auth.js            # Authentication endpoints
│   └── middleware/
│       └── auth.js            # JWT verification
└── README.md                   # This file
```

---

## 🔄 Flow Diagram

```
Frontend (HTML)              Backend (Express)         Database (MongoDB)
───────────────              ─────────────────         ──────────────────

User Input
   ↓
[Signup/Login Form]
   ↓
fetch() POST /signup
or /login
   ↓                          POST /signup   →  Hash Password
   ├────────────────────────→ Save User      →  Store in MongoDB
   ↓                          Generate JWT
   ←────────────────────────  Return Token
Save JWT in 
localStorage
   ↓
Access Dashboard
(using JWT token)
```

---

## ✅ Checklist

- [ ] Backend dependencies installed (`npm install`)
- [ ] `.env` file configured with MongoDB URI
- [ ] Backend server running on port 5000
- [ ] Frontend can access backend at `http://localhost:5000/api`
- [ ] Test signup/login working
- [ ] MongoDB Atlas shows new users
- [ ] JWT token stored in browser localStorage
- [ ] Logout clears token
- [ ] Backend deployed to production URL
- [ ] Frontend updated with production backend URL
- [ ] Environment variables set in production
- [ ] HTTPS enabled on production

---

## 📞 Support

For issues:
1. Check browser console for errors (F12)
2. Check backend server logs
3. Verify MongoDB connection
4. Check `.env` configuration

**Production Checklist Before Launch:**
- ✅ JWT_SECRET is strong (not default)
- ✅ MONGODB_URI is correct
- ✅ NODE_ENV=production
- ✅ Frontend/Backend on HTTPS
- ✅ CORS properly configured for production domain
- ✅ Backup MongoDB data
