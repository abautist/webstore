'use strict';
module.exports = function(sequelize, DataTypes) {
  var feast = sequelize.define('feast', {
    feast: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.feast.belongsTo(models.user);
      }
    }
  });
  return feast;
};