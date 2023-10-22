const dotenv = require('dotenv');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
dotenv.config();
const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);

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
console.log('token', process.env.ACCESS_SECRET);
module.exports.createTokenPair = async payload => {
  return {
    access: await createToken(payload, {
      secret: process.env.ACCESS_SECRET,
      time: process.env.ACCESS_TIME,
    }),
    refresh: await createToken(payload, {
      secret: process.env.REFRESH_SECRET,
      time: process.env.REFRESH_TIME,
    }),
  };
};

module.exports.verifyAccessToken = token =>
  verifyToken(token, { secret: process.env.ACCESS_SECRET });

module.exports.verifyRefreshToken = token =>
  verifyToken(token, { secret: process.env.REFRESH_SECRET });
