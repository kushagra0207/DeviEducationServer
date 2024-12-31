const express = require('express')

const router = express.Router(); // its a class present in the express. It allows to right route in other files.
const contactForm = require("../controllers/contact-controller")

router.route('/contact').post(contactForm);






module.exports = router;