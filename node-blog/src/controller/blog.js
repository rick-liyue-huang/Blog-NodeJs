// 这里面定义了

const handleGetBlogList = (author, keyword) => {
  // 返回假数据
  return [
    {
      id: 1,
      title: "A",
      content: "aa",
      createTime: 1583458655567,
      author: "rick"
    },
    {
      id: 2,
      title: "B",
      content: "bb",
      createTime: 1583458697964,
      author: "leo"
    }
  ];
};

const handleGetBlogDetail = id => {
  return {
    id: 1,
    title: "A",
    content: "aa",
    createTime: 1583458655567,
    author: "rick"
  };
};

const handlePostBlogNew = (blogData = {}) => {
  // blogData is Object
  console.log("blogData: ", blogData);
  return {
    id: 3
  };
};

const handlePostBlogUpdate = (id, blogData = {}) => {
  console.log(id, blogData);
  return true;
};

const handlePostBlogDel = id => {
  return true;
};

module.exports = {
  handleGetBlogList,
  handleGetBlogDetail,
  handlePostBlogNew,
  handlePostBlogUpdate,
  handlePostBlogDel
};
