
const getListHandler = (author, keyword) => {
  // return fake data whose format is same as real data
  return [
    {
      id: 1,
      title: 'title A',
      content: 'content A',
      createTime: 1552615080565,
      author: 'rick'
    },
    {
      id: 2,
      title: 'title B',
      content: 'content B',
      createTime: 1552615080577,
      author: 'huang'
    }
  ]

};

const getDetailHandler = (id) => ({
  id: 1,
  title: 'title A',
  content: 'content A',
  createTime: 1552615080565,
  author: 'rick'
});

// create new blog
const newBlogHandler = (blogData = {}) => {
  // blog data is blog object contain title content
  console.log('new blog data...', blogData);
  return {
    id: 3, // means that new blog will append blog list
  }
}

// update one blog
const updateBlogHandler = (id, blogData = {}) => {
  // id is the updated blog id
  // blog data is blog object contain title content
  console.log('update blog data...', id, blogData);
  return true;
};

// delete blog
const delBlogHandler = (id) => {
  console.log('delete blog data...', id);
  return true
}

module.exports = {
  getListHandler,
  getDetailHandler,
  newBlogHandler,
  updateBlogHandler,
  delBlogHandler
};