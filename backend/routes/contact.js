const express = require('express');
const router = express.Router();
const { sendContactMessage } = require('../controllers/contactController');

/**
 * @route   POST /api/contact
 * @desc    Submit contact form and dispatch email notification
 * @access  Public
 */
router.post('/contact', sendContactMessage);

/**
 * @route   GET /api/health
 * @desc    Health check endpoint for the backend service
 * @access  Public
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Shubham Bhavar Portfolio API'
  });
});

module.exports = router;
