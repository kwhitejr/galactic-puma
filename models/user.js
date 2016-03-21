'use strict';

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {setterMethods: {
      password: function (password) {
        var hashed = hashPassword(password);
        this.setDataValue('password', hashed);
      }
    },
    classMethods: {
      hashPassword: hashPassword,
      associate: function() {}
    }
  });
  return User;
};

function hashPassword (password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}