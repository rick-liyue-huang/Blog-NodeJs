
const xss = require('xss');
// import exec func to get real data
const { exec, escape } = require('../db/mysql');

// deal with data exec on special router
const handleGetBlogList = async (author, keyword) => {
  
  // get data from mysql database
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

const handleGetBlogDetail = async (id) => {
  
  // get real data from db
  const sql = `select * from blogs where id=${id};`;
  const rows = await exec(sql);
  return rows[0];
  // return await exec(sql).then(rows => {
  //   return rows[0] || {} // get object from array
  // });

}

const handlePostBlogNew = async (blogData={}) => {
  console.log('blogData: ', blogData);
  
  // get args from blogData (req.body)
  let title = xss(blogData.title);
  let content = xss(blogData.content);
  const createtime = Date.now();
  let author = blogData.author;

  title = escape(title);
  content = escape(content);
  author = escape(author);

  const sql = `
    insert into blogs (title, content, createtime, author)
    values (${title}, ${content}, ${createtime}, ${author});`;
    const inserData = await exec(sql);
    return {
      id: inserData.insertId
    }
  // return exec(sql).then(inserData => {
  //   if(inserData.insertId) {
  //     return {
  //       id: inserData.insertId
  //     }
  //   } 
  // });

  // return {
  //   id: 6
  // }
}

const handlePostBlogUpdate = async (id, blogData={}) => {
  console.log('blogData: ', id, blogData);

  let title = xss(blogData.title);
  let content = xss(blogData.content);

  title = escape(title);
  content = escape(content);
  const sql = `
    update blogs set title=${title}, content=${content} where id=${id};`;

  const updateData = await exec(sql);
  if(updateData.affectedRows > 0) {
    return true
  } else {
    return false
  }

  // return exec(sql).then(updateData => {
  //   // notice updateData
  //   console.log('updateData: ', updateData);
  //   if(updateData.affectedRows > 0) {
  //     return true
  //   } else {
  //     return false
  //   }
  // });
}

const handlePostBlogDel = async (id, author) => {
  console.log('id: ', id);

  const sql = `delete from blogs where id=${id} and author='${author}';`;
  const delData = await exec(sql);
  if(delData.affectedRows > 0) {
    return true;
  } else {
    return false
  }

  // return exec(sql).then(delData => {
  //   if(delData.affectedRows > 0) {
  //     return true;
  //   } else {
  //     return false
  //   }
  // });
  
  // return true;
}

module.exports = {
  handleGetBlogList,
  handleGetBlogDetail,
  handlePostBlogNew,
  handlePostBlogUpdate,
  handlePostBlogDel
};