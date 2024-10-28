const express = require('express');

const router = express.Router();
//There are two ways to describe call your controllers
// const {home,register} = require('../controllers/auth-controller');

const authcontroller = require('../controllers/auth-controller');
const validate = require('../middlewares/validate-middleware');
const signupSchema = require('../validators/auth-validator');
const authmiddleware = require('../middlewares/auth-middleware');
router.route('/').get(authcontroller.home);
router.route('/register').get(authcontroller.register);
router.route('/register').post(validate(signupSchema),authcontroller.register);
router.route('/login').get(authcontroller.login);
router.route('/login').post(authcontroller.login);

router.route('/user').get(authmiddleware,authcontroller.usertokencheck);//

module.exports= router;