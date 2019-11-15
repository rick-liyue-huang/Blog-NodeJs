
// create model

const Sequelize = require('sequelize');
const seq = require('./seq');

// create User model, table name is 'users' from 'user'
const User = seq.define('user', {
  // id // id created automatically and AI
  userName: {
    type: Sequelize.STRING, // varchar(255)
    allowNull: false, 
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

// create foreign key
Blog.belongsTo(User, {
  foreignKey: 'userId' // Blog.userId -> User.id
});
// or both
User.hasMany(Blog, {
  foreignKey: 'userId'
});

// create Blog Model

module.exports = { User, Blog };