// const express = require('express');
// const { checkAccessToken } = require('../middlewares/tokenMiddle');
// const authRouter = require('./authRouter');

// const userRouter = require('./userRouter');
// const contestRouter = require('./contestRouter');

// const router = express.Router();

// router.use('/auth', checkAccessToken, authRouter);
// router.use('/user', userRouter);
// router.use('/contest', contestRouter);

// router.use(checkAccessToken);


// module.exports = router;

const express = require('express');
const contestController = require('../controllers/contestController');
const sqlChatController = require('../controllers/sqlChatController');
const authRouter = require('./authRouter');
const { checkAccessToken } = require('../middlewares/tokenMiddle');
const userRouter = require('./userRouter');
const contestRouter = require('./contestRouter');
const chatRouter = require('./chatRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', checkAccessToken, userRouter);
router.use('/contest', checkAccessToken, contestRouter);
router.use('/chat', checkAccessToken, chatRouter);
// router.post('/getUser', checkToken.checkAuth);

router.use(checkAccessToken);

// router.post('/dataForContest', contestController.dataForContest);

// router.post(
//   '/pay',
//   basicMiddlewares.onlyForCustomer,
//   upload.uploadContestFiles,
//   basicMiddlewares.parseBody,
//   validators.validateContestCreation,
//   userController.payment
// );

// router.get('/getCustomersContests', contestController.getCustomersContests);

// router.get('/get-moderator-contests', contestController.getModeratorContests);

// router.get(
//   '/getContestById',
//   basicMiddlewares.canGetContest,
//   contestController.getContestById
// );

// router.post(
//   '/getAllContests',
//   basicMiddlewares.onlyForCreative,
//   contestController.getContests
// );

// router.get(
//   '/downloadFile/:fileName',
//   contestController.downloadFile
// );

// router.post(
//   '/updateContest',
//   upload.updateContestFile,
//   contestController.updateContest
// );

// router.post(
//   '/setNewOffer',
//   upload.uploadLogoFiles,
//   basicMiddlewares.canSendOffer,
//   contestController.setNewOffer
// );

// router.post(
//   '/setOfferStatus',
//   basicMiddlewares.onlyForCustomerWhoCreateContest,
//   contestController.setOfferStatus
// );

// router.post(
//   '/set-moderator-decision',
//   contestController.setModeratorDecision
// );

// router.post(
//   '/changeMark',
//   basicMiddlewares.onlyForCustomer,
//   userController.changeMark
// );

// router.post(
//   '/updateUser',
//   upload.uploadAvatar,
//   userController.updateUser
// );

// router.post(
//   '/cashout',
//   basicMiddlewares.onlyForCreative,
//   userController.cashout
// );

// router.post('/new-message', sqlChatController.addMessage);

// router.post('/get-chat', sqlChatController.getChat);

// router.post('/get-preview', sqlChatController.getPreview);

// router.post('/black-list', sqlChatController.blackList);

// router.post('/favorite-sql', sqlChatController.favoriteChat);

// router.post('/create-catalog', sqlChatController.createCatalog);

// router.post('/update-name-natalog', sqlChatController.updateNameCatalog);

// router.post('/add-new-chat-to-catalog', sqlChatController.addNewChatToCatalog);

// router.post(
//   '/remove-chat-from-catalog',
//   sqlChatController.removeChatFromCatalog
// );

// router.post('/delete-catalog', sqlChatController.deleteCatalog);

// router.post('/get-catalogs', sqlChatController.getCatalogs);

module.exports = router;
