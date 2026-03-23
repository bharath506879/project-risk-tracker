# Deployment Checklist

Use this checklist to ensure your application is production-ready.

---

## ✅ Development Phase

- [ ] Backend dependencies installed (`npm install` in backend folder)
- [ ] MongoDB Atlas cluster created and accessible
- [ ] `.env` file updated with correct MongoDB URI
- [ ] Backend server starts without errors: `npm start`
- [ ] Frontend opens and is accessible in browser
- [ ] Frontend can reach backend at `http://localhost:5000/api`
- [ ] Sign up functionality works (new user in MongoDB)
- [ ] Login functionality works with correct credentials
- [ ] Invalid credentials show proper error message
- [ ] JWT token stored in localStorage after login
- [ ] Logout clears token and returns to login page
- [ ] No console errors in browser (F12)
- [ ] No errors in backend terminal/logs

---

## ✅ Pre-Deployment Phase

### Security
- [ ] `JWT_SECRET` is changed from default (strong random string)
- [ ] MongoDB password is strong (20+ characters, mixed case, numbers, symbols)
- [ ] No sensitive data hardcoded in frontend
- [ ] CORS is properly configured
- [ ] Environment variables use production values (not dev)

### Code Quality
- [ ] All `console.log()` for debugging are removed
- [ ] No commented-out code left behind
- [ ] Error messages are user-friendly (not technical)
- [ ] Form validation works on frontend
- [ ] All API errors handled gracefully

### MongoDB
- [ ] Database is backed up
- [ ] Indexes created on `email` field (for unique constraint)
- [ ] Connection string uses correct database name `risktracker`
- [ ] MongoDB Atlas IP whitelist includes deployment server

### Frontend
- [ ] `API_BASE_URL` is configurable for different environments
- [ ] Frontend code is minified/optimized
- [ ] Images and assets load quickly
- [ ] Responses to network latency are handled (loading states)

### Backend
- [ ] All dependencies are in `package.json` (not global installs)
- [ ] Error handling is comprehensive
- [ ] Logging is implemented
- [ ] Health check endpoint works: `/api/health`
- [ ] Server gracefully handles startup/shutdown

---

## ✅ Deployment to Production

### Backend - Render (Recommended)

1. [ ] Create [Render.com](https://render.com) account
2. [ ] Connect your GitHub repository (or upload manually)
3. [ ] Create new "Web Service"
4. [ ] Set Build Command: `npm install`
5. [ ] Set Start Command: `npm start`
6. [ ] Add environment variables:
   - [ ] `MONGODB_URI` = MongoDB connection string
   - [ ] `JWT_SECRET` = Strong random secret
   - [ ] `JWT_EXPIRE` = `7d`
   - [ ] `NODE_ENV` = `production`
   - [ ] `PORT` = `5000` (auto-assigned)
7. [ ] Deploy and wait for success (2-5 minutes)
8. [ ] Copy deployed URL (e.g., `https://myapp.render.com`)
9. [ ] Test health check: `https://myapp.render.com/api/health`

### Backend - Railway (Alternative)

1. [ ] Create [Railway.app](https://railway.app) account
2. [ ] Connect GitHub repository
3. [ ] Railway auto-detects Node.js project
4. [ ] Add MongoDB environment variables
5. [ ] Write config in `railway.toml` (optional)
6. [ ] Deploy automatically
7. [ ] Copy production URL

### Frontend Deployment

#### Option A: Vercel (Easiest)
1. [ ] Go to [vercel.com](https://vercel.com)
2. [ ] Click "Import Project"
3. [ ] Select GitHub repo (or upload folder)
4. [ ] Add environment variables if needed
5. [ ] Deploy (automatic)
6. [ ] Get URL (e.g., `https://myapp.vercel.app`)

#### Option B: Netlify
1. [ ] Go to [netlify.com](https://netlify.com)
2. [ ] Click "Deploy manually"
3. [ ] Drag and drop the `frontend` folder
4. [ ] Or connect GitHub for auto-deploy

#### Option C: GitHub Pages
1. [ ] Push `frontend/riskguard.html` to `gh-pages` branch
2. [ ] Enable Pages in GitHub settings
3. [ ] URL will be `https://username.github.io/repo-name`

---

## ✅ Post-Deployment Verification

### Frontend Tests
- [ ] Frontend loads without errors
- [ ] Can navigate to sign up page
- [ ] Can navigate to login page
- [ ] Styling displays correctly (Tailwind CSS loads)

### API Tests
- [ ] Health check works: `curl https://your-backend/api/health`
- [ ] Can sign up with new email
- [ ] New user appears in MongoDB with hashed password
- [ ] Can login with those credentials
- [ ] JWT token is valid and has 7-day expiration
- [ ] Token retrieved user info correctly

### Integration Tests
1. [ ] Open deployed frontend URL
2. [ ] Click "Sign Up"
3. [ ] Fill form with new user details
4. [ ] Submit (should succeed)
5. [ ] Click "Sign In"
6. [ ] Use same credentials (should succeed)
7. [ ] JWT stored in localStorage
8. [ ] Can access dashboard
9. [ ] Click "Sign Out"
10. [ ] Redirects to login page
11. [ ] Token cleared from localStorage

### Performance Tests
- [ ] Frontend loads in < 3 seconds
- [ ] Login response in < 2 seconds
- [ ] Database queries run efficiently
- [ ] No memory leaks in browser (Chrome DevTools)
- [ ] No server errors in production logs

---

## ✅ Production Updates in Code

### In `frontend/riskguard.html`, change:

**Before (Development):**
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

**After (Production - Render example):**
```javascript
const API_BASE_URL = 'https://project-risk-tracker.render.com/api';
```

**After (Production - Railway example):**
```javascript
const API_BASE_URL = 'https://railway-app-production.up.railway.app/api';
```

---

## ✅ Maintenance

### Regular Tasks
- [ ] Monitor backend logs for errors
- [ ] Check MongoDB storage usage monthly
- [ ] Review failed login attempts for security
- [ ] Backup MongoDB data weekly
- [ ] Update Node.js and packages quarterly

### Emergency Response
- [ ] Disable problematic routes if needed
- [ ] Rollback to previous deployment if critical error
- [ ] Notify users of downtime
- [ ] Update status page

---

## 📞 Deployment Help

### Render Troubleshooting
- App won't start? Check build logs in Render dashboard
- MongoDB connection fails? Verify IP whitelist in Atlas
- Slow responses? Check Render's CPU usage metrics

### Railway Troubleshooting
- Environment variables not working? Add to `.env.production`
- Port conflicts? Railway auto-assigns, don't hardcode
- Memory issues? Upgrade to paid plan

### Frontend Issues
- CORS errors? Backend needs `Access-Control-Allow-Origin` header ✅ (already added)
- API not responding? Check backend deployment URL in code
- Token invalid? Clear localStorage and login again

---

## 🔄 Disaster Recovery

If production breaks:

1. [ ] Keep backend running on old version
2. [ ] Revert frontend to working version
3. [ ] Check MongoDB backups
4. [ ] Review deployment logs
5. [ ] Fix issue in new branch
6. [ ] Test thoroughly locally
7. [ ] Deploy fix to production

---

## 📋 Final Sign-Off

- [ ] Product owner approves deployment
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Team is notified of deployment
- [ ] Monitoring is active
- [ ] Rollback plan documented

**Date Deployed**: _______________  
**Deployed By**: _______________  
**Backend URL**: _______________  
**Frontend URL**: _______________  

---

## 📊 Production Monitoring

Add these monitoring tools:
- [ ] Sentry for error tracking (frontend & backend)
- [ ] Render dashboard for server health
- [ ] MongoDB Atlas dashboard for database health
- [ ] Google Analytics for user behavior
- [ ] UptimeRobot for 24/7 monitoring

---

For detailed setup instructions, see:
- `QUICKSTART.md` - Quick setup guide
- `backend/README.md` - Complete documentation
- `API_TESTING.md` - API endpoints and examples
