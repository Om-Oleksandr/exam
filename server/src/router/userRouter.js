const express = require('express');
const userController = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const userRouter = express.Router();

userRouter.get('/getUser', checkToken.checkAuth);

userRouter.post(
  '/changeMark',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

userRouter.post('/updateUser', upload.uploadAvatar, userController.updateUser);

userRouter.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);
userRouter.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

module.exports = userRouter;
