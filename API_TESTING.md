# API Testing Guide

Use any of these tools to test the authentication API:
- Postman
- Insomnia
- Thunder Client (VS Code)
- cURL in terminal

## Base URL
**Development**: `http://localhost:5000/api`  
**Production**: `https://your-deployed-backend.com/api`

---

## 1️⃣ Sign Up (Create Account)

### Request
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "MySecurePassword123"
}
```

### Success Response (201)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGY3ZjJlODc5YWM1MDAxMzU3MDM5YiIsImlhdCI6MTY5NTM0NTIxNCwiZXhwIjoxNjk2NjQxMjE0fQ.abc123...",
  "user": {
    "id": "650f7f2e879ac5001357039b",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Error Response
```json
{
  "error": "User already exists"
}
```

**Possible Errors:**
- `User already exists` - Email already registered
- `Please provide name, email and password` - Missing fields
- `Please provide a valid email` - Invalid email format
- `Password must be at least 6 characters` - Password too short

---

## 2️⃣ Login

### Request
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "MySecurePassword123"
}
```

### Success Response (200)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGY3ZjJlODc5YWM1MDAxMzU3MDM5YiIsImlhdCI6MTY5NTM0NTIxNCwiZXhwIjoxNjk2NjQxMjE0fQ.abc123...",
  "user": {
    "id": "650f7f2e879ac5001357039b",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Error Response
```json
{
  "error": "Invalid credentials"
}
```

**Possible Errors:**
- `Invalid credentials` - Wrong email or password
- `Please provide email and password` - Missing fields

---

## 3️⃣ Get Current User (Protected)

### Request
```http
GET /auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGY3ZjJlODc5YWM1MDAxMzU3MDM5YiIsImlhdCI6MTY5NTM0NTIxNCwiZXhwIjoxNjk2NjQxMjE0fQ.abc123...
```

### Success Response (200)
```json
{
  "success": true,
  "user": {
    "id": "650f7f2e879ac5001357039b",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Error Response
```json
{
  "error": "Not authorized to access this route"
}
```

---

## 🧪 Test Scenarios

### Scenario 1: New User Registration
1. POST `/auth/signup` with new email
2. Verify response includes JWT token
3. Check MongoDB that user exists with hashed password

### Scenario 2: Existing User Login
1. POST `/auth/login` with registered email/password
2. Verify response includes same JWT token format
3. Use token to call `/auth/me`

### Scenario 3: Invalid Login
1. POST `/auth/login` with wrong password
2. Verify error: "Invalid credentials"

### Scenario 4: Duplicate Email
1. POST `/auth/signup` with existing email
2. Verify error: "User already exists"

---

## 📝 cURL Examples

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Smith",
    "email": "alice@example.com",
    "password": "Alice123456"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "Alice123456"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## 🔑 Sample JWT Token (for testing)

A real JWT contains 3 parts separated by dots:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGY3ZjJlODc5YWM1MDAxMzU3MDM5YiIsImlhdCI6MTY5NTM0NTIxNCwiZXhwIjoxNjk2NjQxMjE0fQ.abc123...
```

**Part 1 (Header)**: Algorithm and token type
**Part 2 (Payload)**: User ID and timestamps
**Part 3 (Signature)**: Verification signature

Decode any JWT at [jwt.io](https://jwt.io)

---

## ✅ Postman Collection

Import this JSON in Postman:

```json
{
  "info": {
    "name": "Project Risk Tracker API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Sign Up",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"name\": \"Test User\", \"email\": \"test@example.com\", \"password\": \"test123456\"}"
        },
        "url": {
          "raw": "{{BASE_URL}}/auth/signup",
          "host": ["{{BASE_URL}}"],
          "path": ["auth", "signup"]
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"email\": \"test@example.com\", \"password\": \"test123456\"}"
        },
        "url": {
          "raw": "{{BASE_URL}}/auth/login",
          "host": ["{{BASE_URL}}"],
          "path": ["auth", "login"]
        }
      }
    },
    {
      "name": "Get Current User",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{JWT_TOKEN}}"
          }
        ],
        "url": {
          "raw": "{{BASE_URL}}/auth/me",
          "host": ["{{BASE_URL}}"],
          "path": ["auth", "me"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "BASE_URL",
      "value": "http://localhost:5000/api"
    },
    {
      "key": "JWT_TOKEN",
      "value": ""
    }
  ]
}
```

---

## 📊 HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful login/fetch |
| 201 | Created | User successfully created |
| 400 | Bad Request | Missing/invalid fields |
| 401 | Unauthorized | Invalid credentials or missing token |
| 500 | Server Error | Database or server issue |

---

## 🔒 Security Notes

✅ Passwords are **hashed** with bcryptjs  
✅ Passwords are **never** returned from API  
✅ Tokens **expire** after 7 days  
✅ Tokens use **HS256** algorithm  
✅ Emails are **unique** and **case-insensitive**  
✅ All inputs are **validated** server-side  

---

## 🐛 Debugging

### Check MongoDB directly
```javascript
db.users.find({}) // See all users
db.users.findOne({email: "test@example.com"}) // Find one user
```

### Enable debug logging
In `server.js`, add:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

### Test token validity
Visit [jwt.io](https://jwt.io) and paste your token to verify it's properly formatted.
