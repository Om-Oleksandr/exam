const express = require('express');
const AuthController = require('../controllers/authController');
const validators = require('../middlewares/validators');
const authRouter = express.Router();

authRouter.post(
  '/sign-up',
  validators.validateRegistrationData,
  AuthController.signUp
);
authRouter.post('/sign-in', validators.validateLogin, AuthController.logIn);
authRouter.post('/refresh', AuthController.refresh);

module.exports = authRouter;
