const express = require('express');
const authRouter = require('./authRouter');
const { checkAccessToken } = require('../middlewares/tokenMiddle');
const userRouter = require('./userRouter');
const contestRouter = require('./contestRouter');
const chatRouter = require('./chatRouter');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', checkAccessToken, userRouter);
router.use('/contest', checkAccessToken, contestRouter);
router.use('/chat', checkAccessToken, chatRouter);
router.get('/getUser', checkToken.checkAuth);

module.exports = router;
