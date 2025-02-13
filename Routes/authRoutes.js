const express = require('express')
const router = express.Router()
const authController = require('../Controllers/authController')


router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);

module.exports = router