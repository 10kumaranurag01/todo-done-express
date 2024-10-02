const express = require('express');
const { registerUser, loginUser, forgotPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);

module.exports = router;
