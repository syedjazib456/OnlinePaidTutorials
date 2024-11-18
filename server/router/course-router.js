const express  = require('express');
const courseDetails = require('../controllers/course-details-controller');
const courses = require('../controllers/course-controller');
const adminauthmiddleware = require('../middlewares/admin-auth-middleware');
const adminmiddleware = require('../middlewares/adminmiddleware');
const upload = require('../middlewares/image-upload-middleware');
const authmiddleware = require('../middlewares/auth-middleware');
const router = express.Router();
router.route('/frontendcourses').get(courses.courses);
router.route('/courses').get(adminauthmiddleware,adminmiddleware,courses.courses);

router.route('/coursereg').get(adminauthmiddleware,adminmiddleware,courses.addCourse);

router.route('/coursereg').post(upload.array('images',10),adminauthmiddleware,adminmiddleware,courses.addCourse);
router.route('/course/:courseid').delete(adminauthmiddleware,adminmiddleware,courses.deleteCourse);
router.route('/course/:courseid').get(adminauthmiddleware,adminmiddleware,courses.getcoursebyId);
router.route('/courseupdate/:courseid').patch(upload.array('images',10),adminauthmiddleware,adminmiddleware,courses.updateacoursebyId);
// **New route to add course details**
router.route('/course/details').post(authmiddleware,courseDetails.addCourseDetails); // To add course details
// **New route to get course details**
router.route('/course/:id/details').get(courseDetails.getCourseWithDetails); // To get course with details

module.exports = router;