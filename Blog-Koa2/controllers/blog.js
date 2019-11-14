
const xss = require('xss');
const { exec, escape } = require('../db/mysql');

const getListHandler = async (author, keyword) => {
  
  let sql = `select * from blogs where 1=1 `;
  if(author) {
    sql += `and author='${author}' `;
  }
  if(keyword) {
    sql += `and title like '%${keyword}%' `;
  }

  sql += `order by createtime desc;`;

  return await exec(sql); // return promise

}

const getDetailHandler = async (id) => {

  let sql = `select * from blogs where id='${id}';`;
  const rows = await exec(sql);
  return rows[0];

}

const postNewHandler = async (blogData = {}) => {
  // blogData is blog object, containing title, content...
  console.log('blogData: ', blogData);
  
  let title = blogData.title;
  let content = blogData.content;
  let author = blogData.author;
  const createtime = Date.now();


  title = xss(title);
  console.log('title: ', title);
  content = xss(content);
  author = xss(author);

  title = escape(title);
  content = escape(content);
  author = escape(author);

  // const sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createtime}', '${author}');`;
  const sql = `insert into blogs (title, content, createtime, author) values (${title}, ${content}, ${createtime}, ${author});`;

  const insertData = await exec(sql);
  return {
    id: insertData.insertId
  }
  
}

const postUpdateHandler = async (id, blogData = {}) => {
  console.log(id, blogData);
  // return true;

  let title = blogData.title;
  let content = blogData.content;

  title = xss(title);
  content = xss(content);

  const sql = `update blogs set title='${title}', content='${content}' where id='${id}';`;

  const updateData = await exec(sql);
  if(updateData.affectedRows > 0) {
    return true; // update success
  } else {
    return false;
  }

}

const postDelHandler = async (id, author) => {
  console.log(id, author);
  // return true;

  const sql = `delete from blogs where id='${id}' and author='${author}';`;
  const deleteData = await exec(sql);
  if(deleteData.affectedRows > 0) {
    return true;
  } else {
    return false;
  }
  
}

module.exports = {
  getListHandler,
  getDetailHandler,
  postNewHandler,
  postUpdateHandler,
  postDelHandler,
};