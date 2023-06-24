const jwt = require('jsonwebtoken');
const createHTTPError = require('http-errors');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');
const userQueries = require('../controllers/queries/userQueries');
const { verifyAccessToken } = require('../services/tokenService');

module.exports.checkAuth = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;
    if (authorization) {
      console.log('authorization', authorization);
      const [, accessToken] = authorization.split(' ');
      const tokenData = await verifyAccessToken(accessToken);
      const foundUser = await userQueries.findUser({ id: tokenData.userId });
      foundUser.password = undefined;
      return res.status(200).send({ data: foundUser });
    }
    next(createHTTPError(401, 'Need token'));
  } catch (err) {
    next(new TokenError());
  }
};
