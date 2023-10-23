const CONSTANTS =  require('../constants')
const {
  APPROVE_STATUSES,
  OFFER_STATUSES
} = CONSTANTS;
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      contestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Contests',
          key: 'id',
        },
      },
      text: {
        type: Sequelize.STRING,
      },
      fileName: {
        type: Sequelize.STRING,
      },
      originalFileName: {
        type: Sequelize.STRING,
      },
      buyerDecision: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: OFFER_STATUSES.PENDING,
      },
      approvedStatus: {
        type: Sequelize.ENUM(...Object.values(APPROVE_STATUSES)),
        allowNull: false,
        defaultValue: APPROVE_STATUSES.PENDING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Offers');
  },
};
