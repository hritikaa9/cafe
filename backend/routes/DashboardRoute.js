const express = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();
// var auth = require('../services/authentication');
// var checkRole = require('../services/checkRole');

router.get('/getDetails', dashboardController.getDetails);

module.exports = router;