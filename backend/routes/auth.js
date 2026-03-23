const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Check if in demo mode
const isDemoMode = process.env.MONGODB_URI.includes('REPLACE_WITH_PASSWORD');

// Demo storage (in-memory, resets on server restart)
const demoUsers = {};

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Demo function: Check if email exists
const demoEmailExists = (email) => {
    return Object.values(demoUsers).some(user => user.email === email.toLowerCase());
};

// Demo function: Find user by email
const demoFindUser = (email) => {
    return Object.values(demoUsers).find(user => user.email === email.toLowerCase());
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please provide name, email and password' });
        }

        // DEMO MODE
        if (isDemoMode) {
            if (demoEmailExists(email)) {
                return res.status(400).json({ error: 'User already exists' });
            }
            
            const userId = 'demo_' + Date.now();
            const bcrypt = require('bcryptjs');
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            
            demoUsers[userId] = {
                _id: userId,
                name,
                email: email.toLowerCase(),
                password: hashedPassword
            };
            
            const token = generateToken(userId);
            
            return res.status(201).json({
                success: true,
                token,
                user: { id: userId, name, email: email.toLowerCase() },
                demo: true
            });
        }

        // PRODUCTION MODE (MongoDB)
        let user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        user = await User.create({
            name,
            email: email.toLowerCase(),
            password
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: error.message || 'Server error during signup' });
    }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }

        // DEMO MODE
        if (isDemoMode) {
            const user = demoFindUser(email);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            
            const bcrypt = require('bcryptjs');
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            
            const token = generateToken(user._id);
            
            return res.status(200).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                demo: true
            });
        }

        // PRODUCTION MODE (MongoDB)
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message || 'Server error during login' });
    }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        // DEMO MODE
        if (isDemoMode) {
            const user = demoUsers[req.user.id];
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                demo: true
            });
        }

        // PRODUCTION MODE (MongoDB)
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error) {
        res.status(500).json({ error: 'Error fetching user data' });
    }
});

module.exports = router;
