const TokenError = require('../errors/TokenError');
const ExpiredToken = require('../errors/ExpiredToken');
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
    next(new TokenError());
  } catch (err) {
    next(new ExpiredToken());
  }
};
