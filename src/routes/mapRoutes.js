const express = require('express');
const router = express.Router();
const { getUserLocations } = require('../controllers/mapController');

router.get('/locations', getUserLocations);

module.exports = router;
