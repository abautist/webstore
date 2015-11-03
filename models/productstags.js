'use strict';
module.exports = function(sequelize, DataTypes) {
  var productsTags = sequelize.define('productsTags', {
    productId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return productsTags;
};