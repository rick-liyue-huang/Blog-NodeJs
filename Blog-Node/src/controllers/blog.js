const { exec } = require('../db/mysql');

const getListHandler = (author, keyword) => {
  // return the fake data fristly
  // return [
  //   {
  //     id: 1,
  //     title: 'A',
  //     content: 'content A',
  //     createTime: 1573003438399,
  //     author: 'Rick'
  //   },
  //   {
  //     id: 2,
  //     title: 'B',
  //     content: 'content B',
  //     createTime: 1573003480716,
  //     author: 'Leo'
  //   }
  // ]

  let sql = `select * from blogs where 1=1 `;
  if(author) {
    sql += `and author='${author}' `;
  }
  if(keyword) {
    sql += `and title like '%${keyword}%' `;
  }

  sql += `order by createtime desc;`;

  return exec(sql); // return promise

}

const getDetailHandler = (id) => {
  // return {
  //   id: 1,
  //   title: 'A',
  //   content: 'content A',
  //   createTime: 1573003438399,
  //   author: 'Rick'
  // }

  let sql = `select * from blogs where id='${id}';`;
  return exec(sql).then(rows => {
    return rows[0];
  })

}

const postNewHandler = (blogData = {}) => {
  // blogData is blog object, containing title, content...
  console.log('blogData: ', blogData);
  // return {
  //   id: 3
  // }
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createtime = Date.now();

  const sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createtime}', '${author}');`;

  return exec(sql).then(insertData => {
    console.log(insertData);
    return {
      id: insertData.insertId
    }
  });
}

const postUpdateHandler = (id, blogData = {}) => {
  console.log(id, blogData);
  // return true;

  const title = blogData.title;
  const content = blogData.content;

  const sql = `update blogs set title='${title}', content='${content}' where id='${id}';`;

  return exec(sql).then(updateData => {
    console.log(updateData);
    if(updateData.affectedRows > 0) {
      return true; // update success
    } else {
      return false;
    }
  });

}

const postDelHandler = (id, author) => {
  console.log(id, author);
  // return true;

  const sql = `delete from blogs where id='${id}' and author='${author}';`;
  return exec(sql).then(deleteData => {
    console.log(deleteData);
    if(deleteData.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  });
}

module.exports = {
  getListHandler,
  getDetailHandler,
  postNewHandler,
  postUpdateHandler,
  postDelHandler,
};