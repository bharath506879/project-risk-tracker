# Step-by-Step Commands

Copy and paste these commands in your terminal to set up the project locally.

---

## 🎯 Complete Local Setup (10 minutes)

### Step 1: Install Node.js (if not already installed)
Download from https://nodejs.org/

### Step 2: Navigate to Backend Folder
```bash
cd "c:\project risk prection\backend"
```

### Step 3: Install Dependencies
```bash
npm install
```

Output should show:
```
added 42 packages in 5.2s
```

### Step 4: Configure MongoDB
Open `.env` file and replace:
```
REPLACE_WITH_PASSWORD
```

With your MongoDB Atlas password. Example:
```
mongodb+srv://bharathgunnisetti53_db_user:your_actual_password_here@projectrisktracker.z1s3gjk.mongodb.net/risktracker
```

### Step 5: Start Backend Server
```bash
npm start
```

You should see:
```
✓ MongoDB Connected
✓ Server running on http://localhost:5000
✓ API Base: http://localhost:5000/api
```

**Keep this terminal window open!**

### Step 6: Open New Terminal Window (don't close the backend)
```bash
# Open second terminal for frontend
# In that terminal, navigate to frontend:
cd "c:\project risk prection\frontend"
```

### Step 7: Start Frontend Server (Optional - but recommended)
```bash
# Using Python 3
python -m http.server 8000

# OR using Node.js
npx http-server
```

### Step 8: Open in Browser
Go to: `http://localhost:8000/riskguard.html`

Or if just opening file directly: `file:///c:/project%20risk%20prection/frontend/riskguard.html`

---

## ✅ Test It

### 1. Sign Up
- Click "Sign Up"
- Enter:
  - Name: `John Doe`
  - Email: `john@example.com`
  - Password: `password123`
- Click "Create Account"

### 2. Verify in MongoDB
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Open Collections
- Look in `risktracker` → `users`
- You should see your new user with **hashed password** ✅

### 3. Login
- Click "Sign In"
- Enter email and password
- Click "Sign In"
- Should redirect to dashboard ✅

---

## 🚀 Deploy to Production

### Option A: Deploy Backend to Render

```bash
# 1. commit to github
git add .
git commit -m "Real authentication system"
git push origin main

# 2. Go to https://render.com
# 3. Create new Web Service
# 4. Connect your GitHub
# 5. Set up environment variables in Render dashboard:
#    - MONGODB_URI: your_connection_string
#    - JWT_SECRET: your_strong_secret
#    - JWT_EXPIRE: 7d
#    - NODE_ENV: production
# 6. Deploy!
```

### Option B: Deploy Using Render CLI

```bash
# Install Render CLI
npm install -g @render-oss/render-cli

# Login
render login

# Deploy
render deploy
```

### Update Frontend with Production URL

Edit `frontend/riskguard.html`:

Find this line:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Replace with your production URL:
```javascript
const API_BASE_URL = 'https://your-app-name.render.com/api';
```

Save and re-deploy frontend.

---

## 📱 Test Production

```bash
# Test backend health
curl https://your-backend-url/api/health

# Test signup
curl -X POST https://your-backend-url/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpass123"
  }'

# Test login
curl -X POST https://your-backend-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

---

## 🛠️ Common Issues & Fixes

### Issue: "Cannot connect to MongoDB"
**Fix:**
```bash
# Check .env file has correct password
# Open .env and verify MONGODB_URI is correct
cat .env | grep MONGODB_URI
```

### Issue: "Backend not running"
**Fix:**
```bash
# Make sure you're in backend folder
cd "c:\project risk prection\backend"

# Reinstall dependencies
npm install

# Start again
npm start
```

### Issue: "CORS error in browser"
**Fix:**
- Backend already has CORS enabled ✅
- Make sure API_BASE_URL in frontend matches backend URL
- Clear browser cache (Ctrl+Shift+Delete)

### Issue: "Invalid credentials error"
**Fix:**
- User must exist in MongoDB first
- Email must be lowercase
- Password must match exactly
- Try signing up with new email instead

### Issue: "Port 5000 already in use"
**Fix:**
```bash
# Change port in .env file
PORT=5001

# Or kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID {PID} /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

---

## 📦 File Structure After Setup

```
project risk prection/
├── frontend/
│   ├── riskguard.html
│   └── playground-1.mongodb.js
├── backend/
│   ├── node_modules/          ← Created by npm install
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   ├── .env                   ← Configure this!
│   ├── .gitignore
│   └── README.md
├── QUICKSTART.md              ← You are here
├── DEPLOYMENT_CHECKLIST.md
└── API_TESTING.md
```

---

## ✨ What's Next

1. **Use the app**: Add projects, calculate risks, visualize data ✅
2. **Deploy to production**: Follow deployment checklist
3. **Monitor in production**: Set up error tracking (Sentry)
4. **Scale features**: Add more API endpoints as needed

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Start backend | `cd backend && npm start` |
| Install dependencies | `npm install` |
| Stop server | `Ctrl+C` |
| Check if port 5000 is used | `netstat -ano \| findstr :5000` |
| View MongoDB users | Access Atlas → Collections → users |
| Test API | See API_TESTING.md |
| Deploy to Render | Go to render.com and connect GitHub |

---

## 🎉 You're All Set!

The complete authentication system is ready:

✅ Backend with Express + MongoDB + bcrypt + JWT  
✅ Frontend with API calls (no localStorage auth)  
✅ Password hashing and validation  
✅ 7-day JWT token expiration  
✅ CORS enabled  
✅ Error handling  
✅ Production-ready code  

**Next Step**: Open `http://localhost:8000/riskguard.html` and test!

---

## 🐛 Debug Tips

### View Backend Logs
The terminal running `npm start` shows real-time logs:
```
POST /api/auth/signup - User john@example.com created
POST /api/auth/login - User authenticated
```

### View MongoDB Logs
MongoDB Atlas Dashboard → Activity → Logs

### Browser Console (F12)
- Shows frontend JS errors
- Network tab shows API calls
- Storage tab shows localStorage tokens

### Test Token in Browser
```javascript
// Paste in browser console (F12):
localStorage.getItem('rg_token')
// Should show JWT token if logged in
```

---

## 📚 Documentation

- `QUICKSTART.md` - 5-minute setup
- `backend/README.md` - Complete backend docs
- `API_TESTING.md` - How to test all endpoints
- `DEPLOYMENT_CHECKLIST.md` - Production deployment guide

**Last updated**: March 2026
