
const { Blog, User } = require('./model');

;(async function() {

  // create users
 
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
    nickName: 'miduo'
  });
  const aj = await User.create({
    userName: 'aj',
    password: '456',
    nickName: 'qiyang'
  });

  // console.log('rick: ', rick.dataValues);
  // insert into users (...) values (...)

  const blog1 = await Blog.create({
    title: 'AAA',
    content: 'aaa',
    userId: rick.dataValues.id
  });

  const blog2 = await Blog.create({
    title: 'BBB',
    content: 'bb',
    userId: leo.dataValues.id
  });

  const blog3 = await Blog.create({
    title: 'CCC',
    content: 'cc',
    userId: claire.dataValues.id
  });

  const blog4 = await Blog.create({
    title: 'DDD',
    content: 'dd',
    userId: aj.dataValues.id
  })

  const blog5 = await Blog.create({
    title: 'EEE',
    content: 'eee',
    userId: rick.dataValues.id
  })
})()