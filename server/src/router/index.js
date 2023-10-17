const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const sqlChatController = require('../controllers/sqlChatController');
const upload = require('../utils/fileUpload');
const router = express.Router();

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration,
);

router.post(
  '/login',
  validators.validateLogin,
  userController.login,
);

router.post(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest,
);

router.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

router.post(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests,
);

router.get(
  '/getContestById',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

router.post(
  '/getAllContests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

router.post(
  '/getUser',
  checkToken.checkAuth,
);

router.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile,
);

router.post(
  '/updateContest',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest,
);

router.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

router.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

router.post(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

router.post(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser,
);

router.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

router.post(
  '/new-message',
  checkToken.checkToken,
  sqlChatController.addMessage,
);

router.post(
  '/get-chat',
  checkToken.checkToken,
  sqlChatController.getChat,
);

router.post(
  '/get-preview',
  checkToken.checkToken,
  sqlChatController.getPreview,
);

router.post(
  '/black-list',
  checkToken.checkToken,
  sqlChatController.blackList,
);

router.post(
  '/favorite-sql',
  checkToken.checkToken,
  sqlChatController.favoriteChat,
);

router.post(
  '/create-catalog',
  checkToken.checkToken,
  sqlChatController.createCatalog,
);

router.post(
  '/update-name-natalog',
  checkToken.checkToken,
  sqlChatController.updateNameCatalog,
);

router.post(
  '/add-new-chat-to-catalog',
  checkToken.checkToken,
  sqlChatController.addNewChatToCatalog,
);

router.post(
  '/remove-chat-from-catalog',
  checkToken.checkToken,
  sqlChatController.removeChatFromCatalog,
);

router.post(
  '/delete-catalog',
  checkToken.checkToken,
  sqlChatController.deleteCatalog,
);

router.post(
  '/get-catalogs',
  checkToken.checkToken,
  sqlChatController.getCatalogs,
);

module.exports = router;
