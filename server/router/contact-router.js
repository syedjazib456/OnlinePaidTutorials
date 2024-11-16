const express  = require('express');

const auth = require('../controllers/auth-controller');
const authmiddleware = require('../middlewares/auth-middleware');

const router = express.Router();
router.route('/contact').get(authmiddleware,auth.contact);
router.route('/contact').post(authmiddleware,auth.contact);
module.exports = router;