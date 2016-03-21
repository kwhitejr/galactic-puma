'use strict';

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var Roaster = sequelize.define('Roaster', {
    roasterBusinessName: DataTypes.STRING,
    street: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    webSite: DataTypes.STRING,
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
  return Roaster;
};

function hashPassword (password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}