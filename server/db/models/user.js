const Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');
const db = require('../');

const User = db.define('user', {
    email: {
        type:  Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    salt: {
        type: Sequelize.STRING
    },
})



User.prototype.correctPassword = function (candidatePassword) {
    return User.encryptPassword(candidatePassword, this.salt) === this.password;
  };
  
  User.prototype.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
  };
  
  User.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64');
  };
  
  User.encryptPassword = (plainText, salt) => {
    const hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
  };
  
  const setSaltAndPassword = (user) => {
    if (user.changed('password')) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password, user.salt)
    }
  }
  
  
  
  
  User.beforeCreate(setSaltAndPassword)
  User.beforeUpdate(setSaltAndPassword)
  
  module.exports = User