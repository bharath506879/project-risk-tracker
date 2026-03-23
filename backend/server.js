const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Check if using demo mode (MongoDB URI contains REPLACE_WITH_PASSWORD)
const isDemoMode = process.env.MONGODB_URI.includes('REPLACE_WITH_PASSWORD');

// MongoDB Connection (or Demo Mode)
if (!isDemoMode) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('✓ MongoDB Connected'))
        .catch(err => {
            console.error('✗ MongoDB Connection Failed:', err.message);
            process.exit(1);
        });
} else {
    console.log('⚠️  DEMO MODE: Using in-memory storage (no MongoDB)');
    console.log('📝 To use production MongoDB:');
    console.log('   1. Get password from MongoDB Atlas');
    console.log('   2. Edit backend/.env and replace REPLACE_WITH_PASSWORD');
    console.log('   3. Restart server');
}

// Routes
app.use('/api/auth', require('./routes/auth'));

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ API Base: http://localhost:${PORT}/api\n`);
});
