const express  = require('express');

const courses = require('../controllers/course-controller');
const adminauthmiddleware = require('../middlewares/admin-auth-middleware');
const adminmiddleware = require('../middlewares/adminmiddleware');
const upload = require('../middlewares/image-upload-middleware');
const router = express.Router();
router.route('/frontendcourses').get(courses.courses);
router.route('/courses').get(adminauthmiddleware,adminmiddleware,courses.courses);

router.route('/coursereg').get(adminauthmiddleware,adminmiddleware,courses.addCourse);

router.route('/coursereg').post(upload.array('images',10),adminauthmiddleware,adminmiddleware,courses.addCourse);
router.route('/course/:courseid').delete(adminauthmiddleware,adminmiddleware,courses.deleteCourse);
router.route('/course/:courseid').get(adminauthmiddleware,adminmiddleware,courses.getcoursebyId);
router.route('/courseupdate/:courseid').patch(adminauthmiddleware,adminmiddleware,courses.updateacoursebyId);
module.exports = router;