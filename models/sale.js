'use strict';
module.exports = function(sequelize, DataTypes) {
  var sale = sequelize.define('sale', {
    email: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stripeToken: DataTypes.STRING,
    image: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.sale.belongsTo(models.user);
      }
    }
  });
  return sale;
};