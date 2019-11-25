
const { Blog, User } = require('./model');

;(async function() {

  // const rick = await User.findOne({
  //   where: {
  //     userName: 'rick'
  //   }
  // });

  // console.log('rick: ', rick.dataValues);

  // const blogName = await Blog.findOne({
  //   attributes: ['title', 'content'],
  //   where: {
  //     title: 'AAA'
  //   }
  // });
  // console.log('rickName: ', blogName.dataValues);

  const rickBlogList = await Blog.findAll({
    where: {
      userId: 1
    },
    order: [
      ['id', 'desc']
    ],
    limit: 1, // blog number per page
    offset: 1 // page number
  });
  console.log('rickBlogList: ', rickBlogList.map(blog => {
    return blog.dataValues
  }));

  // query the total number
  const blogListAndCount = await Blog.findAndCountAll({
    order: [
      ['id', 'desc']
    ]
  });
  console.log('count: ', blogListAndCount.count, blogListAndCount.rows.map(blog => {
    return blog.dataValues
  }));


  // using foreign key to query 

  /* match with
  Blog.belongsTo(User, {
    // create foreign key Blog.userId -> User.id
    foreignKey: 'userId'
  });
  */
  const BlogListWithUser = await Blog.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName'],
        where: {
          userName: 'rick'
        }
      }
    ]
  });

  console.log('BlogListWithUser: ', BlogListWithUser.rows.map(blog => {
    const blogVal = blog.dataValues;
    blogVal.user = blogVal.user.dataValues;
    return blogVal;
  }));


  /* match with 
  User.hasMany(Blog, {
    foreignKey: 'userId'
  });
  */

  const UserListWithBlog = await User.findAndCountAll({
    attributes: ['userName', 'nickName'],
    include: [
      {
        model: Blog
      }
    ]
  });

  console.log('UserListWithBlog: ', UserListWithBlog.rows.map(user => {
    const userVal = user.dataValues;
    JSON.stringify(userVal.blogs = userVal.blogs.map(blog => blog.dataValues));
    return userVal;
  }));
  
})();

