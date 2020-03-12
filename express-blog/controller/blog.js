// 这里面定义了
const xss = require("xss");
const { exec } = require("../db/mysql");

const handleGetBlogList = (author, keyword) => {
  // 返回假数据
  /*
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
  */

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

  return exec(sql); // 返回的是promise包裹着listdata
};

const handleGetBlogDetail = id => {
  /*
  return {
    id: 1,
    title: "A",
    content: "aa",
    createTime: 1583458655567,
    author: "rick"
  };
  */
  const sql = `select * from blogs where id=${id}`;
  return exec(sql).then(rows => {
    return rows[0]; // 因为得到是数组，需要得到第一个元素
  });
};

const handlePostBlogNew = (blogData = {}) => {
  // blogData is Object
  console.log("blogData: ", blogData);
  // return {
  //   id: 3
  // };
  let title = blogData.title;
  let content = blogData.content;
  let author = blogData.author;
  title = xss(title);
  content = xss(content);
  author = xss(author);

  const createTime = Date.now();
  const sql = `insert into blogs (title, content, createtime, author) 
   values ('${title}', '${content}', ${createTime}, '${author}')`;
  return exec(sql).then(insertData => {
    console.log(insertData);
    return {
      id: insertData.insertId
    };
  });
};

const handlePostBlogUpdate = (id, blogData = {}) => {
  console.log(id, blogData);
  // return true;

  let title = blogData.title;
  let content = blogData.content;
  // title = escape(title);
  // content = escape(content);
  const sql = `update blogs set 
  title='${title}', content='${content}' where id=${id};`;
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  });
};

const handlePostBlogDel = (id, author) => {
  // return true;
  // author = escape(author);
  const sql = `delete from blogs where id=${id} and author='${author}';`;
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  });
};

module.exports = {
  handleGetBlogList,
  handleGetBlogDetail,
  handlePostBlogNew,
  handlePostBlogUpdate,
  handlePostBlogDel
};
