const express = require('express');
const router = express.Router();

// GET /api/health
router.get('/health', (req, res, next) => {
    res.send('OK');
});

// ROUTER: /api/sales
router.use('/sales', require('./sales'));

// ROUTER: /api/purchases
router.use('/purchases', require('./purchases'));

module.exports = router;