const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const {validateRegister} = require('../validators/authValidator');

router.post('/register', validateRegister, authController.register);
router.get('/confirm', authController.confirmAccount);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
