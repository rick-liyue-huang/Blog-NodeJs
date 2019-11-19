
const { exec } = require('../db/mysql');

const handleGetList = (author, keyword) => {
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
  return exec(sql);

}

const handleGetDetail = (id) => {
  // return {
  //   id: 1
  // }
  const sql = `select * from blogs where id=${id};`;
  return exec(sql).then(rows => {
    console.log('rows[0]: ', rows[0]);
    return rows[0];
  });
}

const handlePostNew = (blogData = {}) => {
  console.log('blogData: ', blogData);
  // return {
  //   id: 3
  // }
  const title = blogData.title;
  const content = blogData.content;
  const createtime = Date.now();
  const author = blogData.author;
  const sql = `insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createtime}, '${author}');`;
  
  return exec(sql).then(insertData => {
    console.log('insertData: ', insertData);
    return {
      id: insertData.insertId
    }
  });
}

const handlePostUpdate = (id, blogData = {}) => {
  console.log('id, blogData: ', id, blogData);
  // return true;
  const title = blogData.title;
  const content = blogData.content;
  const sql = `update blogs set title='${title}', content='${content}' 
   where id=${id};`;
  
  return exec(sql).then(updateData => {
    console.log('updateData: ', updateData.affectedRows);
    if(updateData.affectedRows > 0) {
      return true;
    } else {
      return false
    }
  });
}

const handlePostDel = (id, author) => {
  console.log('id: ', id);
  // return true;
  const sql = `delete from blogs where id=${id} and author='${author}';`;
  return exec(sql).then(delData => {
    if(delData.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  })
}

module.exports = {
  handleGetList, handleGetDetail,
  handlePostNew, handlePostUpdate, handlePostDel
}