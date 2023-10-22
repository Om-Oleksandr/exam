'use strict';
const { Model } = require('sequelize');
const CONSTANTS = require('../constants');
const {
  APPROVE_STATUSES,
  OFFER_STATUSES
} = CONSTANTS;
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate (models) {
      Offer.belongsTo(models.User, {
        foreignKey: 'userId',
        sourceKey: 'id',
      });
      Offer.belongsTo(models.Contest, {
        foreignKey: 'contestId',
        sourceKey: 'id',
      });
      Offer.hasOne(models.Rating, {
        foreignKey: 'offerId',
        targetKey: 'id',
      });
    }
  }
  Offer.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      originalFileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      buyerDecision: {
        type: DataTypes.ENUM(...Object.values(OFFER_STATUSES)),
        allowNull: true,
        defaultValue: OFFER_STATUSES.PENDING,
      },
      approvedStatus: {
        type: DataTypes.ENUM(...Object.values(APPROVE_STATUSES)),
        allowNull: false,
        defaultValue: APPROVE_STATUSES.PENDING,
      },
    },
    {
      sequelize,
      modelName: 'Offer',
      timestamps: true,
    }
  );
  return Offer;
};
