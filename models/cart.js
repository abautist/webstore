'use strict';
module.exports = function(sequelize, DataTypes) {
  var cart = sequelize.define('cart', {
    name: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.cart.belongsTo(models.user);
      }
    }
  });
  return cart;
};