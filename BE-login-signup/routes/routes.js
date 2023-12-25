const express = require('express');
const authController = require('../controller/authcontroller');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/user', authController.getUser);
router.post('/logout', authController.logout);
router.post('/send-email', authController.sendEmail);
router.post('/reset-pw', authController.resetpw);
router.get('/admin', (req, res) => {
  // Check if the request is from an admin
  // You may use middleware for a more robust solution
  const isAdmin = req.user && req.user.admin;
  if (!isAdmin) {
    return res.status(403).json({
      message: 'Access forbidden. User is not an admin.',
    });
  }
  res.json({
    message: 'Admin page',
  });
});

module.exports = router;
