require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200', process.env.FRONTEND_URL || '*'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api', contactRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Shubham Bhavar's Portfolio Backend API 🚀",
    status: 'Running',
    endpoints: {
      health: '/api/health',
      contact: 'POST /api/contact'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found on this server.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error. Please try again later.'
  });
});

// Optional MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shubham_portfolio';

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 4000 // fail fast if local MongoDB not running so server still starts
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully.');
})
.catch((err) => {
  console.log('ℹ️  MongoDB connection skipped or unavailable (API will still handle contact emails). Error:', err.message);
});

// Start listening
const server = app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Portfolio API Server running on port ${PORT}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}`);
  console.log(`📩 Contact Endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`=========================================`);
});

module.exports = app;
