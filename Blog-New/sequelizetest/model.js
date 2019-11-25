
const Sequelize = require('sequelize');
const seq = require('./seq');

// create User model
// 'user' is tables 'users'
const User = seq.define('user', {
  // id auto added as ai pk
  userName: {
    type: Sequelize.STRING, // match to varchar(255)
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    comment: 'nickname'
  }
});

/**
 * DROP TABLE IF EXISTS `users`
 * CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , 
 * `userName` VARCHAR(255) NOT NULL, `password` VARCHAR(255) NOT NULL, `nickName` VARCHAR(255),
 *  `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
 */

const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

/**
 * CREATE TABLE IF NOT EXISTS `blogs` (`id` INTEGER NOT NULL auto_increment , 
 * `title` VARCHAR(255) NOT NULL, `content` VARCHAR(255) NOT NULL, 
 * `userid` INTEGER NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, 
 * PRIMARY KEY (`id`)) ENGINE=InnoDB;
 */

// foreign key
Blog.belongsTo(User, {
  // create foreign key Blog.userId -> User.id
  foreignKey: 'userId'
});

// Blog.belongsTo(User) 
// if has not Blog.userId, it will create userId to match with User.id

// connect the two database in second way
User.hasMany(Blog, {
  foreignKey: 'userId'
});

module.exports = {
  User, Blog
}