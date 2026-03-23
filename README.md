# Project Risk Tracker - Full Stack Authentication System

🚀 **Production-ready authentication system** connecting your frontend app to MongoDB with real user accounts, JWT tokens, and bcrypt password hashing.

![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)

---

## 🎯 What's Included

### ✅ Frontend (HTML + Tailwind CSS)
- Modern, glassmorphism UI  
- Sign up & login forms  
- Real-time form validation  
- JWT token storage  
- Beautiful project dashboard  

### ✅ Backend (Node.js + Express)
- RESTful API endpoints  
- User authentication routes  
- Input validation  
- Error handling  
- CORS enabled  

### ✅ Database (MongoDB Atlas)
- Cloud-hosted database  
- User collection with schema  
- Email uniqueness constraint  
- Automatic timestamps  

### ✅ Security
- bcryptjs password hashing  
- JWT tokens (7-day expiration)  
- Token verification middleware  
- HTTPS-ready  
- Input sanitization  

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org/))
- MongoDB Atlas account ([create free](https://www.mongodb.com/cloud/atlas))
- Code editor (VS Code, Sublime, etc.)

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Configure MongoDB
Edit `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:PASSWORD@cluster.mongodb.net/risktracker
JWT_SECRET=your_strong_secret_key_here_change_in_production
```

### 3. Start Backend
```bash
npm start
```

Expected output:
```
✓ MongoDB Connected
✓ Server running on http://localhost:5000
```

### 4. Open Frontend
Open in browser: `frontend/riskguard.html`

### 5. Test It
- **Sign Up**: Create new account
- **Login**: Use same credentials
- **Dashboard**: Access project tracker
- **Sign Out**: Clear token and logout

---

## 📁 Project Structure

```
project-risk-tracker/
│
├── frontend/
│   ├── riskguard.html          ← Main app (updated with API calls)
│   └── playground-1.mongodb.js ← MongoDB test file
│
├── backend/
│   ├── server.js               ← Express entry point
│   ├── package.json            ← Dependencies
│   ├── .env                    ← Config (add password here!)
│   ├── .gitignore
│   ├── models/
│   │   └── User.js            ← Mongoose schema
│   ├── routes/
│   │   └── auth.js            ← Auth endpoints
│   ├── middleware/
│   │   └── auth.js            ← JWT verification
│   └── README.md              ← Detailed docs
│
├── QUICKSTART.md              ← 5-minute setup guide
├── COMMANDS.md                ← Copy-paste commands
├── API_TESTING.md             ← How to test endpoints
├── DEPLOYMENT_CHECKLIST.md    ← Production deployment
├── ARCHITECTURE.md            ← System design & flow
└── README.md                  ← This file
```

---

## 🔐 Authentication Flow

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │ Sign Up / Login
       ↓
┌─────────────────────────────────┐
│   Frontend (HTML + JavaScript)  │
│  fetch() API calls to backend   │
└─────────────┬───────────────────┘
              │ HTTPS
              ↓
┌─────────────────────────────────┐
│   Backend (Express + Node.js)   │
│  ✓ Validate input               │
│  ✓ Hash password (bcryptjs)     │
│  ✓ Check MongoDB                │
│  ✓ Generate JWT token           │
└─────────────┬───────────────────┘
              │ Save user
              ↓
┌─────────────────────────────────┐
│  MongoDB Atlas (Cloud DB)       │
│  ✓ Store user with hashed pwd   │
│  ✓ Enforce unique email         │
└─────────────────────────────────┘
              │ Return token
              ↑
        Store token in
        localStorage (safe!)
              ↑
┌─────────────────────────────────┐
│   Frontend (Logged In)          │
│  Use token for API requests     │
│  Access dashboard & features    │
└─────────────────────────────────┘
```

---

## 📚 API Endpoints

### POST /api/auth/signup
Create a new user account

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
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
Login existing user

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### GET /api/auth/me
Get current user (requires JWT token)

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

See [API_TESTING.md](./API_TESTING.md) for complete endpoint documentation.

---

## 🛡️ Security Features

### Password Security
- ✅ **Hashed**: Using bcryptjs (10 salt rounds)
- ✅ **Never Plain Text**: Stored as hash in database
- ✅ **Can't be Reversed**: One-way cryptographic hash
- ✅ **Unique Salt**: Each password has different salt

### Token Security
- ✅ **Signed**: Using HS256 algorithm with secret
- ✅ **Expiring**: 7-day expiration time
- ✅ **Verified**: Backend validates every request
- ✅ **Not Reusable**: Expired tokens rejected

### Data Protection
- ✅ **Email Unique**: MongoDB enforces uniqueness
- ✅ **Input Validated**: Server-side validation
- ✅ **CORS Enabled**: Cross-origin requests
- ✅ **HTTPS Ready**: Works with SSL/TLS

---

## 🚀 Deployment

### Deploy Backend to Render (Free)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Real authentication system"
   git push
   ```

2. **Create Render Account**: https://render.com

3. **Deploy:**
   - Click "New" → "Web Service"
   - Connect GitHub repo
   - Build: `npm install`
   - Start: `npm start`
   - Set environment variables:
     - `MONGODB_URI` - Your MongoDB connection string
     - `JWT_SECRET` - Strong secret key
     - `NODE_ENV` - `production`

4. **Update Frontend:**
   In `frontend/riskguard.html`, change:
   ```javascript
   const API_BASE_URL = 'https://your-app.render.com/api';
   ```

5. **Deploy Frontend** to Vercel, Netlify, or GitHub Pages

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for details.

---

## 📝 Documentation

| File | Purpose |
|------|---------|
| [QUICKSTART.md](./QUICKSTART.md) | 5-minute local setup |
| [COMMANDS.md](./COMMANDS.md) | Copy-paste commands |
| [API_TESTING.md](./API_TESTING.md) | How to test endpoints |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | Production deployment |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design & changes |
| [backend/README.md](./backend/README.md) | Backend documentation |

---

## 🔄 What Changed

### Removed ❌
- localStorage-based mock users
- Plain text password storage
- Frontend-only authentication
- No database

### Added ✅
- MongoDB Atlas integration
- Bcrypt password hashing
- JWT token generation
- Real API backend
- Production-grade security

---

## 🧪 Testing

### Local Testing
```bash
# 1. Backend running on localhost:5000
npm start

# 2. Frontend open
# Open frontend/riskguard.html in browser

# 3. Sign up with test data
Name: Test User
Email: test@example.com
Password: test123456

# 4. Verify in MongoDB
# Check users collection in MongoDB Atlas

# 5. Login with same credentials
# Should access dashboard
```

### API Testing with Postman
See [API_TESTING.md](./API_TESTING.md) for Postman collection.

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check MongoDB URI in .env
# Verify no other app on port 5000
# Reinstall dependencies
npm install
npm start
```

### CORS errors
- Backend already has CORS enabled ✅
- Check API_BASE_URL matches your backend
- Clear browser cache

### MongoDB connection fails
- Verify password in .env file
- Add your IP to MongoDB Atlas whitelist
- Check connection string is correct

### Invalid credentials error
- User must be signed up first
- Email must match exactly (case-insensitive)
- Password must be correct

See [backend/README.md](./backend/README.md) for more troubleshooting.

---

## 📊 Project Stats

- **Backend**: Express.js server with 3 endpoints
- **Database**: MongoDB Atlas with 1 collection
- **Security**: JWT + bcryptjs implementation
- **Frontend**: Single HTML file with API integration
- **Code Size**: ~500 lines backend + ~100 lines frontend changes
- **Setup Time**: 5 minutes

---

## 💡 What's Next

After setup, you can:

1. **Use the App** - Add projects and track risks
2. **Add Features** - Extend API with more endpoints
3. **Deploy** - Make live using Render/Railway/Vercel
4. **Monitor** - Set up error tracking with Sentry
5. **Scale** - Add more security, caching, etc.

---

## 🤝 Contributing

This is a starter project. You can:
- Add more API routes
- Implement email verification
- Add password reset
- Integrate OAuth
- Add admin dashboard

---

## 📄 License

MIT License - Feel free to use in your projects

---

## 🎓 Learning Resources

- [JWT Guide](https://jwt.io/introduction)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [Bcryptjs Docs](https://github.com/dcodeIO/bcrypt.js)
- [CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

## ✨ Key Features Implemented

✅ User registration with password hashing  
✅ User login with JWT token generation  
✅ Token verification on protected routes  
✅ MongoDB Atlas cloud database  
✅ Input validation and error handling  
✅ CORS support for cross-origin requests  
✅ Environment variable configuration  
✅ Production-ready code structure  
✅ Comprehensive documentation  
✅ Deployment-ready setup  

---

## 🆘 Support

If you encounter issues:

1. Check the [QUICKSTART.md](./QUICKSTART.md) guide
2. Review [API_TESTING.md](./API_TESTING.md) for endpoint details
3. Check [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system
4. See [backend/README.md](./backend/README.md) for backend docs
5. Check browser console (F12) for errors
6. Check backend terminal logs

---

**Last Updated**: March 2026  
**Status**: ✅ Production Ready  
**Version**: 1.0.0  

**Ready to build something great!** 🚀

---

### Quick Commands Reference

```bash
# Setup
cd backend && npm install

# Run
npm start

# Test
# Open frontend/riskguard.html in browser

# Deploy backend
# Go to render.com and connect GitHub

# Update frontend URL
# Edit const API_BASE_URL in riskguard.html
```

---

Made with ❤️ for secure, scalable authentication.
