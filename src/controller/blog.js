
// avoid xss attack
const xss = require('xss');
const { exec, escape } = require('../db/mysql');

const getBlogListHandler = (author, keyword) => {

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

const getBlogDetailHandler = (id) => {

  // query sentence return array, so need to transfer to object
  const sql = `select * from blogs where id='${id}';`
  return exec(sql).then(rows => {
    return rows[0];
  });

  /*
  return {
    id: 1,
    title: 'title A',
    content: 'content A',
    createTime: 1552615080565,
    author: 'rick'
   }
   */

};

// create new blog
const postBlogNewHandler = (blogData = {}) => {
  
  // avoid xss attack
  let title = xss(blogData.title);
  console.log('title-1: ', title);
  let content = xss(blogData.content);
  let author = blogData.author;
  const createTime = Date.now();

  // avoid sql inject attack
  title = escape(title);
  console.log('title-2: ', title);
  content = escape(content);
  author = escape(author);

  // const sql = `
  //   insert into blogs (title, content, createtime, author)
  //   values ('${title}', '${content}', ${createTime}, '${author}');
  // `;

  // avoid sql inject attack
  const sql = `
    insert into blogs (title, content, createtime, author)
    values (${title}, ${content}, ${createTime}, ${author});
  `;

  return exec(sql).then(insertData => {
    console.log('insertData is ', insertData);
    return {
      id: insertData.insertId
    }
  });

  // blog data is blog object contain title content
  // console.log('new blog data...', blogData);
  // return {
  //   id: 3, // means that new blog will append blog list
  // }
}

// update one blog
const postBlogUpdateHandler = (id, blogData = {}) => {

  const title = xss(blogData.title);
  const content = xss(blogData.content);

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

  // id is the updated blog id
  // blog data is blog object contain title content
  // console.log('update blog data...', id, blogData);
  // return true;
};

// delete blog
const postBlogDelHandler = (id, author) => {

  const sql = `delete from blogs where id=${id} and author='${author}';`
  return exec(sql).then(deleteData => {
    console.log('deleteData is ', deleteData);
    if(deleteData.affectedRows > 0) {
      return true;
    }
    return false
  });

  // console.log('delete blog data...', id);
  // return true
}

module.exports = {
  getBlogListHandler,
  getBlogDetailHandler,
  postBlogNewHandler,
  postBlogUpdateHandler,
  postBlogDelHandler
};