'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    }, 
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 99],
        notEmpty: true
      }
    },  
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.provider);
        models.user.hasMany(models.cart);
        models.user.hasMany(models.sale);
      },
      authenticate: function(email, password, callback) {
        this.find({where: { email: email } }).then(function(user) {
          if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
              if (err) {
                callback(err, false);
              } else {
                callback(null, result ? user: false);
              }
            });
          } else {
            callback(null, false);
          }
        }).catch(callback)
      }
    },
    instanceMethods: {
      checkPassword: function(password, callback){
        if (password && this.password) {
          bcrypt.compare(password, this.password, callback);
        } else {
          callback(null, false);
        }
      }
    },
    hooks: {
      beforeCreate: function(user, options, callback) {
        if (user.password) {
          bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) {
              return callback(err);
            } else {
              user.password = hash;
              callback(null, user);
            }
          });
        } else {
          callback(null, user);
        }
      }
    }
  });
  return user;
};