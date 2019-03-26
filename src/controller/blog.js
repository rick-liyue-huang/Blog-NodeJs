

// deal with data exec on special router
const handleGetBlogList = (author, keyword) => {
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
  ];
}

const handleGetBlogDetail = (id) => {
  return {
    id: 1,
    title: 'title A',
    content: 'content A',
    createTime: 1552615080565,
    author: 'rick'
   };
}

const handlePostBlogNew = (blogData={}) => {
  console.log('blogData: ', blogData);
  return {
    id: 6
  }
}

const handlePostBlogUpdate = (id, blogData={}) => {
  console.log('blogData: ', id, blogData);
  return true;
}

const handlePostBlogDel = (id) => {
  console.log('id: ', id);
  return true;
}

module.exports = {
  handleGetBlogList,
  handleGetBlogDetail,
  handlePostBlogNew,
  handlePostBlogUpdate,
  handlePostBlogDel
};