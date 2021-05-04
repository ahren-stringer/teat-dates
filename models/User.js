'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    userId: DataTypes.INTEGER,
    project: DataTypes.INTEGER,
    date_registration: DataTypes.DATEONLY,
    date_last_activity: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};