'use strict';
module.exports = function(sequelize, DataTypes) {
  var sale = sequelize.define('sale', {
    name: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    stripeToken: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return sale;
};