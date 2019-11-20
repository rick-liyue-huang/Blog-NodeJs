
const xss = require('xss');
const { exec, escape } = require('../db/mysql');

const handleGetList = async (author, keyword) => {
  // return [
  //   {id: 1}, {id: 2}
  // ]
  let sql = `select * from blogs where 1=1 `;
  if(author) {
    sql += `and author='${author}' `;
  }
  if(keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;

  console.log('exec(sql): ', exec(sql));
  return await exec(sql);

}

const handleGetDetail = async (id) => {
  // return {
  //   id: 1
  // }
  const sql = `select * from blogs where id=${id};`;
  const rows = await exec(sql);
  return rows[0];
  
}

const handlePostNew = async (blogData = {}) => {
  console.log('blogData: ', blogData);
  // return {
  //   id: 3
  // }
  let title = blogData.title;
  let content = blogData.content;
  const createtime = Date.now();
  const author = blogData.author;
  title = xss(title);
  content = xss(content);

  title = escape(title);
  content = escape(content);
  const sql = `insert into blogs (title, content, createtime, author)
    values (${title}, ${content}, ${createtime}, '${author}');`;
  
  const insertData = await exec(sql);
  return {
    id: insertData.insertId
  }
  
}

const handlePostUpdate = async (id, blogData = {}) => {
  console.log('id, blogData: ', id, blogData);
  // return true;
  let title = blogData.title;
  let content = blogData.content;

  title = escape(title);
  content = escape(content);

  title = xss(title);
  content = xss(content);

  const sql = `update blogs set title=${title}, content=${content}
   where id=${id};`;
  
  const updateData = await exec(sql);
  if(updateData.affectedRows > 0) {
      return true;
    } else {
      return false
    }
  
}

const handlePostDel = async (id, author) => {
  console.log('id: ', id);
  // return true;
  const sql = `delete from blogs where id=${id} and author='${author}';`;
  
  const delData = await exec(sql);
  if(delData.affectedRows > 0) {
    return true;
  } else {
    return false;
  }
  
}

module.exports = {
  handleGetList, handleGetDetail,
  handlePostNew, handlePostUpdate, handlePostDel
}