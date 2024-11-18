const express = require('express');
const purchaseCourse = require('../controllers/payment-controller');
const authmiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

// Purchase a course
router.post('/purchase',authmiddleware,purchaseCourse.purchaseCourse);

module.exports = router;