'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};