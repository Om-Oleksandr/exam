const createHTTPErrors = require('http-errors');
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require('../services/tokenService');
const TokenError = require('../errors/TokenError');

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req; 
    if (authorization) {
      const [, accessToken] = authorization.split(' ');
      req.tokenData = await verifyAccessToken(accessToken);
      return next();
    }
    next(createHTTPErrors(401, 'Need token'));
  } catch (error) {
    next(new TokenError());
  }
};

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const { body: refreshToken } = req;
    req.tokenData = await verifyRefreshToken(refreshToken);
    return next();
  } catch (error) {
    next(error);
  }
};
