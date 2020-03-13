// 这里面定义了
const xss = require("xss");
const { exec } = require("../db/mysql");

const handleGetBlogList = async (author, keyword) => {
  author = xss(author);
  keyword = xss(keyword);
  // author = escape(author);
  // keyword = escape(keyword);
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author = '${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;

  return await exec(sql); // 返回的是promise包裹着listdata
};

const handleGetBlogDetail = async id => {
  const sql = `select * from blogs where id=${id}`;
  const rows = await exec(sql);
  return rows[0];
};

const handlePostBlogNew = async (blogData = {}) => {
  // blogData is Object
  console.log("blogData: ", blogData);

  let title = blogData.title;
  let content = blogData.content;
  let author = blogData.author;
  title = xss(title);
  content = xss(content);
  author = xss(author);

  const createTime = Date.now();
  const sql = `insert into blogs (title, content, createtime, author) 
   values ('${title}', '${content}', ${createTime}, '${author}')`;
  const insertData = await exec(sql);
  return {
    id: insertData.insertId
  };
};

const handlePostBlogUpdate = async (id, blogData = {}) => {
  console.log(id, blogData);
  // return true;

  let title = blogData.title;
  let content = blogData.content;
  // title = escape(title);
  // content = escape(content);
  const sql = `update blogs set 
  title='${title}', content='${content}' where id=${id};`;
  const updateData = await exec(sql);
  if (updateData.affectedRows > 0) {
    return true;
  } else {
    return false;
  }
};

const handlePostBlogDel = async (id, author) => {
  // author = escape(author);
  const sql = `delete from blogs where id=${id} and author='${author}';`;
  const delData = await exec(sql);
  if (delData.affectedRows > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  handleGetBlogList,
  handleGetBlogDetail,
  handlePostBlogNew,
  handlePostBlogUpdate,
  handlePostBlogDel
};
