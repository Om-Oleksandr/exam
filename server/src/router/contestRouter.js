const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');
const upload = require('../utils/fileUpload');
const contestRouter = express.Router();

contestRouter.post('/dataForContest', contestController.dataForContest);

contestRouter.get('/getCustomersContests', contestController.getCustomersContests);

contestRouter.get('/get-moderator-contests', contestController.getModeratorContests);

contestRouter.get(
  '/getContestById',
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

contestRouter.get(
  '/getAllContests',
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

contestRouter.get(
  '/downloadFile/:fileName',
  contestController.downloadFile,
);

contestRouter.patch(
  '/updateContest',
  upload.updateContestFile,
  contestController.updateContest,
);

contestRouter.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

contestRouter.patch(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

contestRouter.patch(
  '/set-moderator-decision',
  contestController.setModeratorDecision,
);

module.exports = contestRouter;
