// routes.js
const express = require('express');
const authController = require('../controller/authcontroller');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/user', authController.getUser);
router.post('/logout', authController.logout);
router.post('/send-email', authController.sendEmail);
router.post('/reset-pw', authController.resetpw)
module.exports = router;
