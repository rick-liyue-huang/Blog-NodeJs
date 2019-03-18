
const { exec } = require('../db/mysql');

const getListHandler = (author, keyword) => {

  // return genuine data
  let sql = `select * from blogs where 1=1 `
  if(author) {
    sql += `and author='${author}' `
  }

  if(keyword) {
    sql += `and title like '%${keyword}%' `
  }

  sql += `order by createtime desc;`

  // return promise
  return exec(sql)

  // return fake data whose format is same as real data
  /*
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
  */

};

const getDetailHandler = (id) => {
  // return {
  //   id: 1,
  //   title: 'title A',
  //   content: 'content A',
  //   createTime: 1552615080565,
  //   author: 'rick'
  //  }

  // query sentence return array, so need to transfer to object
  const sql = `select * from blogs where id='${id}';`
  return exec(sql).then(rows => {
    return rows[0];
  });

};

// create new blog
const newBlogHandler = (blogData = {}) => {
  // blog data is blog object contain title content
  // console.log('new blog data...', blogData);
  // return {
  //   id: 3, // means that new blog will append blog list
  // }
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createTime = Date.now();

  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createTime}, '${author}');
  `
  return exec(sql).then(insertData => {
    console.log('insertData is ', insertData);
    return {
      id: insertData.insertId
    }
  })
}

// update one blog
const updateBlogHandler = (id, blogData = {}) => {
  // id is the updated blog id
  // blog data is blog object contain title content
  // console.log('update blog data...', id, blogData);
  // return true;

  const title = blogData.title;
  const content = blogData.content;

  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id}
  `;

  return exec(sql).then(updateData => {
    console.log('updateData is ', updateData);
    if(updateData.affectedRows > 0) {
      return true;
    }
    return false
  });
};

// delete blog
const delBlogHandler = (id, author) => {
  // console.log('delete blog data...', id);
  // return true

  const sql = `delete from blogs where id=${id} and author='${author}';`
  return exec(sql).then(deleteData => {
    console.log('deleteData is ', deleteData);
    if(deleteData.affectedRows > 0) {
      return true;
    }
    return false
  })
}

module.exports = {
  getListHandler,
  getDetailHandler,
  newBlogHandler,
  updateBlogHandler,
  delBlogHandler
};