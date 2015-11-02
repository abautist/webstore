'use strict';
module.exports = function(sequelize, DataTypes) {
  var cart = sequelize.define('cart', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return cart;
};