const createHTTPError = require('http-errors');
const TokenError = require('../errors/TokenError');
const userQueries = require('../controllers/queries/userQueries');
const { verifyAccessToken } = require('../services/tokenService');

module.exports.checkAuth = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;
    if (authorization) {
      const [, accessToken] = authorization.split(' ');
      const tokenData = await verifyAccessToken(accessToken);
      const foundUser = await userQueries.findUser({ id: tokenData.userId });
      foundUser.password = undefined;
      return res.status(200).send({ data: foundUser });
    }
    res.sendStatus(401);
    next(createHTTPError(401, 'Need token'));
  } catch (err) {
    next(new TokenError());
  }
};
