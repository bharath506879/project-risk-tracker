# Quick Start Guide

## Development Setup (5 minutes)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Update MongoDB Password
Edit `backend/.env` and replace:
```
REPLACE_WITH_PASSWORD
```
with your actual MongoDB password.

### 3. Start Backend
```bash
npm start
```

Expected output:
```
✓ MongoDB Connected
✓ Server running on http://localhost:5000
✓ API Base: http://localhost:5000/api
```

## 4. Open Frontend
Open `frontend/riskguard.html` in your browser.

---

## Test the System

### Sign Up
- Click "Sign Up"
- Enter: Name, Email, Password
- Click "Create Account"
- User is saved to MongoDB with hashed password ✅

### Login
- Click "Sign In"
- Enter Email and Password
- Click "Sign In"
- JWT token is stored in localStorage ✅

### Logout
- Click "Sign Out" button
- Token is removed ✅

---

## Verify MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Login to your account
3. Navigate to: Collections → risktracker database → users collection
4. You should see your new user with:
   - ✅ Hashed password (not plain text!)
   - ✅ Email (lowercase)
   - ✅ Name
   - ✅ Timestamps

---

## Production Deployment

### Update Backend URL in Frontend
In `frontend/riskguard.html`, find this line:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Change it to your production URL:
```javascript
const API_BASE_URL = 'https://your-app-name.render.com/api';
```

### Deploy Backend
- Use [Render.com](https://render.com) or [Railway.app](https://railway.app)
- Set environment variables in the deployment platform
- Deploy with 1-click

See `README.md` for detailed deployment instructions.

---

## Key Files Changed

✅ **New**: `backend/server.js` - Express server  
✅ **New**: `backend/models/User.js` - MongoDB schema  
✅ **New**: `backend/routes/auth.js` - API endpoints  
✅ **New**: `backend/middleware/auth.js` - JWT verification  
✅ **Modified**: `frontend/riskguard.html` - API calls instead of localStorage  

---

## What Was Removed

❌ localStorage for user storage (`rg_mock_users`)  
❌ localStorage for active user (`rg_active_user`)  
❌ Mock authentication logic  
❌ Plain text passwords  

## What Was Added

✅ MongoDB Atlas integration  
✅ Bcrypt password hashing  
✅ JWT token generation  
✅ Real API endpoints  
✅ CORS support  
✅ Production-ready error handling  

---

## Need Help?

1. **Backend not starting?** Check MongoDB URI in `.env`
2. **Frontend not connecting?** Verify backend runs on `http://localhost:5000`
3. **Invalid credentials?** User must be signed up first in MongoDB
4. **Password too insecure?** Passwords must be at least 6 characters

See full README.md for complete documentation.
