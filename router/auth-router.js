const express = require('express')

const router = express.Router(); // its a class present in the express. It allows to right route in other files.

const authcontrollers = require('../controllers/auth-controller');

const {signupSchema, loginSchema} = require("../validators/auth-validator");

const validate = require("../middlewares/validator-middleware");

const authMiddleware = require("../middlewares/auth-middleware")

router.route('/').get(authcontrollers.home);
router.route('/register').post(validate(signupSchema), authcontrollers.register);
router.route('/login').post(validate(loginSchema), authcontrollers.login);
router.route('/user').get(authMiddleware, authcontrollers.user);
router.get('/verify', authcontrollers.verifyEmail);
router.route('*').get(authcontrollers.all);

 




module.exports = router;