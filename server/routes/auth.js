const express = require('express');

//controllers
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/register', authController.register);

module.exports = router;
