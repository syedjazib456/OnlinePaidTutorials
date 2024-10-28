const express  = require('express');

const courses = require('../controllers/course-controller');

const router = express.Router();

router.route('/courses').get(courses);

module.exports = router;