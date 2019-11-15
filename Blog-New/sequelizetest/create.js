
// insert into users (...) values (...);

const { Blog, User } = require('./model');

!(async function () {
 
  // create user
  const rick = await User.create({
    userName: 'rick',
    password: '666',
    nickName: 'liyue'
  });
  const leo = await User.create({
    userName: 'leo',
    password: '456',
    nickName: 'liyue'
  });
  const claire = await User.create({
    userName: 'claire',
    password: '456',
    nickName: 'liyue'
  });
  const aj = await User.create({
    userName: 'aj',
    password: '456',
    nickName: 'liyue'
  });

  const blog1 = await Blog.create({
    title: 'A',
    content: 'Aa',
    userId: rick.dataValues.id
  });
  const blog2 = await Blog.create({
    title: 'B',
    content: 'Bb',
    userId: claire.dataValues.id
  });
  const blog3 = await Blog.create({
    title: 'C',
    content: 'Cc',
    userId: aj.dataValues.id
  });

  // console.log('username: ', rick.dataValues);
})()