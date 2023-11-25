const {
  verifyAccessToken,
  verifyRefreshToken,
} = require('../services/tokenService');
const TokenError = require('../errors/TokenError');
const ExpiredToken = require('../errors/ExpiredToken');

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
    next(new TokenError());
  } catch (error) {
    next(new ExpiredToken());
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
