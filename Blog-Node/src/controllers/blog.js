
const getListHandler = (author, keyword) => {
  // return the fake data fristly
  return [
    {
      id: 1,
      title: 'A',
      content: 'content A',
      createTime: 1573003438399,
      author: 'Rick'
    },
    {
      id: 2,
      title: 'B',
      content: 'content B',
      createTime: 1573003480716,
      author: 'Leo'
    }
  ]
}

const getDetailHandler = (id) => {
  return {
    id: 1,
    title: 'A',
    content: 'content A',
    createTime: 1573003438399,
    author: 'Rick'
  }
}

const postNewHandler = (blogData = {}) => {
  // blogData is blog object, containing title, content...
  console.log('blogData: ', blogData);
  return {
    id: 3
  }
}

const postUpdateHandler = (id, blogData = {}) => {
  console.log(id, blogData);
  return true;
}

const postDelHandler = id => {
  console.log(id);
  return true;
}

module.exports = {
  getListHandler,
  getDetailHandler,
  postNewHandler,
  postUpdateHandler,
  postDelHandler,
};