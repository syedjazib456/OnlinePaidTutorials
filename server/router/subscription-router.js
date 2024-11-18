const {checkSubscription,createSubscription} = require('../controllers/subscription-controller');
const authmiddleware = require('../middlewares/auth-middleware');
const checkAccess = require('../controllers/course-access-management');
const express =require('express');
const router = express.Router();

// Create a subscription
router.post('/subscribe',authmiddleware,createSubscription);

// Check subscription status
router.get('/status',authmiddleware,checkSubscription);

// Check access to a specific course (based on purchase or subscription)
router.post('/access',authmiddleware,checkAccess.checkAccess);

module.exports = router;