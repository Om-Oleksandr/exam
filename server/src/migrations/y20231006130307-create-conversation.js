'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Conversations',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        participant1: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        participant2: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        blackList: {
          type: Sequelize.ARRAY(Sequelize.BOOLEAN),
          allowNull: false,
          defaultValue: [false, false],
        },
        favoriteList: {
          type: Sequelize.ARRAY(Sequelize.BOOLEAN),
          allowNull: false,
          defaultValue: [false, false],
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          participants_unique: { fields: ['participant1', 'participant2'] },
        },
      }
    );
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Conversations');
  },
};
