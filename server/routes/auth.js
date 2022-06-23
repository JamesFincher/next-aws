const express = require('express');

//validators
const { userRegisterValidator } = require('../validators/auth');
const { runValidation } = require('../validators/index');
//controllers
const authController = require('../controllers/auth');

const router = express.Router();

router.post(
  '/register',
  userRegisterValidator,
  runValidation,
  authController.register
);

module.exports = router;
