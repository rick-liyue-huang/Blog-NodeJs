
const handleGetList = (author, keyword) => {
  return [
    {id: 1}, {id: 2}
  ]
}

const handleGetDetail = (id) => {
  return {
    id: 1
  }
}

const handlePostNew = (blogData = {}) => {
  console.log('blogData: ', blogData);
  return {
    id: 3
  }
}

const handlePostUpdate = (id, blogData = {}) => {
  console.log('id, blogData: ', id, blogData);
  return true;
}

const handlePostDel = (id) => {
  console.log('id: ', id);
  return true;
}

module.exports = {
  handleGetList, handleGetDetail,
  handlePostNew, handlePostUpdate, handlePostDel
}