const express  = require('express');

const admin = require('../controllers/admin-controller');
const adminregisterSchema = require('../validators/admin-auth-validator');
const adminauthmiddleware = require('../middlewares/admin-auth-middleware');
const adminvalidate = require('../middlewares/validate-middleware');
const upload = require('../middlewares/image-upload-middleware');
const adminmiddleware = require('../middlewares/adminmiddleware');
const router = express.Router();

router.route('/register').get(admin.adminreg);
router.route('/register').post(upload.single('image'),adminvalidate(adminregisterSchema),admin.adminreg);
router.route('/login').get(admin.adminlog);
router.route('/login').post(admin.adminlog);
router.route('/admintokencheck').get(adminauthmiddleware,admin.admintokencheck);
router.route('/admindetails').get(adminauthmiddleware,adminmiddleware,admin.fetchadmin);
router.route('/update/:adminid').get(adminauthmiddleware,adminmiddleware,admin.getadminbyId);
router.route('/updatedata/:adminid').patch(adminauthmiddleware,adminmiddleware,upload.single('image'),admin.updateadminbyId);
router.route('/admindelete/:adminid').delete(adminauthmiddleware,adminmiddleware,admin.deleteAdmin);

module.exports = router;