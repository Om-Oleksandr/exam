const JWTService = require('./tokenService');
const { MAX_DEVICES_AMOUNT } = require('../constants');

module.exports.createSession = async user => {
  try {
    console.log(user);
    const tokenPair = await JWTService.createTokenPair(user);
    console.log('TOKEN======>>>>>>', tokenPair);
    if ((await user.countRefreshTokens()) >= MAX_DEVICES_AMOUNT) {
      const [oldestToken] = await user.getRefreshTokens({
        order: [['updatedAt', 'ASC']],
      });
      await oldestToken.update({ value: tokenPair.refresh });
    } else {
      await user.createRefreshToken({ value: tokenPair.refresh });
    }
    user.password = undefined;
    return { user, tokenPair };
  } catch (error) {
    console.log(user);
    throw new Error(error.message);
  }
};

module.exports.refreshSession = async refreshToken => {
  try {
    const user = await refreshToken.getUser();
    const tokenPair = await JWTService.createTokenPair(user);
    await refreshToken.update({ value: tokenPair.refresh });
    user.password = undefined;
    return { user, tokenPair };
  } catch (error) {
    throw new Error(error.message);
  }
};
