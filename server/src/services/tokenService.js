const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);

const {
  TOKENS: {
    ACCESS_SECRET,
    ACCESS_TIME,
    REFRESH_SECRET,
    REFRESH_TIME,
  },
} = require('../constants');

const verifyToken = (token, { secret }) => verifyJWT(token, secret);

const createToken = (payload, { secret, time }) => {
  return signJWT(
    {
      userId: payload.id,
      email: payload.email,
      role: payload.role,
    },
    secret,
    {
      expiresIn: time,
    }
  );
};

module.exports.createTokenPair = async payload => {
  return {
    access: await createToken(payload, {
      secret: ACCESS_SECRET,
      time: ACCESS_TIME,
    }),
    refresh: await createToken(payload, {
      secret: REFRESH_SECRET,
      time: REFRESH_TIME,
    }),
  };
};

module.exports.verifyAccessToken = token =>
  verifyToken(token, { secret: ACCESS_SECRET });

module.exports.verifyRefreshToken = token =>
  verifyToken(token, { secret: REFRESH_SECRET });
