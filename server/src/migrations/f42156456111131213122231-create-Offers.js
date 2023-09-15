const CONSTANTS =  require('./../constants')
const {
  APPROVE_STATUSES: { APPROVED, REJECTED, PENDING },
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
        allowNull: true,
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      originalFileName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      buyerDecision: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
      approvedStatus: {
        type: Sequelize.ENUM(APPROVED, REJECTED, PENDING),
        allowNull: false,
        defaultValue: PENDING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Offers');
  },
};
