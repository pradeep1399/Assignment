const express = require('express');
const { getEvents, processManualEvent, getMetrics } = require('../controllers/apiController');

const router = express.Router();

router.get('/events', getEvents);
router.post('/process', processManualEvent);
router.get('/metrics', getMetrics);

module.exports = router;
