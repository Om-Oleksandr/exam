'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { ROLES } = require('../constants');

const hashPassword = async (user, options) => {
  if (user.changed('password')) {
    const { password } = user;
    const hashedPass = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    user.password = hashedPass;
  }
};

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Offer, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(models.Contest, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(models.Rating, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(models.RefreshToken, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    }
    async comparePassword (password) {
      return bcrypt.compare(password, this.getDataValue('password'));
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        field: 'passHash',
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM(...Object.values(ROLES)),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
    }
  );

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};
