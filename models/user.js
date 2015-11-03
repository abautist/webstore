'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
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
        // associations can be defined here
      },
      authenticate: function(email, pasword, callback) {
        this.find({where: { email: email} }).then(function(user) {
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
        });
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
        }
      }
    }
  });
  return user;
};