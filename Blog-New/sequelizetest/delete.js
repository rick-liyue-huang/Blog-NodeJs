
const { Blog, User } = require('./model');

!(async function() {

  const delRes = await Blog.destroy({
    where: {
      id: 3
    }
  });
  console.log(delRes > 0);
})()