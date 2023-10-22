'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Catalog.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    }
  }
  Catalog.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      catalogName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      conversations: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Catalog',
    }
  );
  return Catalog;
};
