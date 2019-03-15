
const getList = (author, keyword) => {
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

}

module.exports = {
  getList
};