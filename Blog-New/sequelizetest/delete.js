
const { Blog, User } = require('./model');

;(async function() {

  // delete one blog
  const delblogRes = await Blog.destroy({
    where: {
      id: 4
    }
  });
  console.log('res: ', delblogRes > 0);

  const delUserRes = await User.destroy({
    where: {
      id: 1
    }
  });
  console.log('res: ', delUserRes);
})();