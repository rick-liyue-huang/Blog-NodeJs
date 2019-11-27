
/**
 * @description user data model
 * @author Rick
 */

const seq = require('../seq');
const { STRING, DECIMAL } = require('../types');

// create 'users' table
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: 'username unique'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: 'password for username'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: 'nickname'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: 'gender 1 for male, 2 for female, 3 for secret',
  },
  picture: {
    type: STRING,
    comment: 'the picture url link'
  },
  city: {
    type: STRING,
    comment: 'location'
  }

});

module.exports = User;

