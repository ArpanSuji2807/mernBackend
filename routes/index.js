const express = require('express');
const router = express.Router();

let searchRoutes = require('./user-logs');

router.use('/search', searchRoutes);

module.exports = router;