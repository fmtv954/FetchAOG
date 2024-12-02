const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

router.get('/', flightController.getFlightData);

module.exports = router;

