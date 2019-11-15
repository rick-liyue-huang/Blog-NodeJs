
const { Blog, User } = require('./model');

!(async function() {

  // sSELECT `id`, `userName`, `password`, `nickName`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`userName` = 'rick' LIMIT 1;

  // const rick = await User.findOne({
  //   where: {
  //     userName: 'rick'
  //   }
  // })

  // SELECT `userName`, `nickName` FROM `users` AS `user` WHERE `user`.`userName` = 'leo' LIMIT 1

  // const leo = await User.findOne({
  //   attributes: ['userName', 'nickName'],
  //   where: {
  //     userName: 'leo'
  //   }
  // });

  // SELECT `id`, `title`, `content`, `userId`, `createdAt`, `updatedAt` FROM `blogs` AS `blog` ORDER BY `blog`.`userId` DESC;

  // const list = await Blog.findAll({
  //   order: [
  //     ['userId', 'desc']
  //   ]
  // });

  // const blog2 = await Blog.findAll({
  //   limit: 2,
  //   offset: 1,
  //   order: [
  //     ['userId', 'desc']
  //   ]
  // })

  // count the total list length
  // const listAndCount = await Blog.findAndCountAll({
  //   limit: 2,
  //   offset: 1,
  //   order: [
  //     ['userId', 'desc']
  //   ]
  // });

  // connected query
  // match with `Blog.belongsTo(User`
  // const bloglistwithuser = await Blog.findAndCountAll({
  //   order: [
  //     ['id', 'desc']
  //   ],
  //   include: [
  //     {
  //       model: User,
  //       attributes: ['userName', 'nickName'],
  //       where: {
  //         userName: 'rick'
  //       }
  //     }
  //   ]
  // })

  const userlistwithblog = await User.findAndCountAll({
    attributes: ['userName', 'nickName'],
    include: [
      {
        model: Blog
      }
    ]
  });

  // console.log('rick: ', rick.dataValues);

  // console.log('leo: ', leo.dataValues);

  // console.log(list.map(blog => {
  //   return blog.dataValues
  // }));

  // console.log(blog2.map(blog => {
  //   return blog.dataValues
  // }));

  // console.log('list and count: ', listAndCount.count, listAndCount.rows.map(blog => blog.dataValues));

  // console.log(bloglistwithuser.count, bloglistwithuser.rows.map(blog => {
  //   const blogVal = blog.dataValues;
  //   blogVal.user = blogVal.user.dataValues
  //   return blogVal;
  // }));

  console.log(
    userlistwithblog.count, 
    
    userlistwithblog.rows.map(user => {
      const userVal = user.dataValues;
      console.log
      userVal.blogs = userVal.blogs.map(blog => blog.dataValues)
      return userVal;
    })
  
  );


})()

