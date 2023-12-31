'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Conversation.hasMany(models.Message, {
        foreignKey: { field: 'conversationId' },
        targetKey: 'id',
      });
    }
  }
  Conversation.init(
    {
      participant1: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      participant2: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      blackList: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false,
        defaultValue: [false, false],
      },
      favoriteList: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false,
        defaultValue: [false, false],
      },
    },
    {
      sequelize,
      modelName: 'Conversation',
    }
  );
  return Conversation;
};
