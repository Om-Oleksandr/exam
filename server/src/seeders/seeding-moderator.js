const bcrypt = require('bcrypt');
const hashPass = async () => {
  const hash = await bcrypt.hash(
    'moderator@gmail.com',
    Number(process.env.SALT_ROUNDS),
  );
  return hash;
};
module.exports = {
  up: async (queryInterface) => {
    const hashedPass = await hashPass();
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'moderator',
          lastName: 'moderator',
          displayName: 'moderator',
          passHash: hashedPass,
          email: 'moderator@gmail.com',
          role: 'moderator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
};
