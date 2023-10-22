'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Message.belongsTo(models.Conversation, {
        foreignKey: { field: 'conversationId' },
        targetKey: 'id',
      });
      Message.belongsTo(models.User, {
        foreignKey: 'sender',
        targetKey: 'id',
      });
    }
  }
  Message.init(
    {
      sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    { sequelize, timestamps: true, modelName: 'Message' }
  );
  return Message;
};
