const createHTTPErrors = require('http-errors');
const { User, RefreshToken } = require('../models');
const AuthServices = require('../services/authService');

module.exports.logIn = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({
      where: { email },
    });
    if (user && (await user.comparePassword(password))) {
      const data = await AuthServices.createSession(user);
      return res.status(200).send({ data });
    }
    next(createHTTPErrors(401, 'Unauthorized'));
  } catch (error) {
    next(error);
  }
};

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);
    if (user) {
      const data = await AuthServices.createSession(user);
      return res.status(201).send({ data });
    }
    next(createHTTPErrors(400, 'Bad request'));
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    const instanceRefreshToken = await RefreshToken.findOne({
      where: { value: refreshToken },
    });
    const data = await AuthServices.refreshSession(instanceRefreshToken);
    res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};
