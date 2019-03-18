
## Blog in Node.js

### Introduction
In this project, I use Node.js to create one server supporting one blog. It contains 'Home page', 'Author page', 'Detail page', 'Login page', 'management center', 'new page', 'edit page'.

On the first part, I use only pure node.js to create the server connecting with mySQL database, and let the front-end to get the data in real time.



### Tech Proposal

1. Create Server by node.js;
2. Create database by MySQL datbase;
3. Establish connection between server and database;
4. Let front-end get data in real time.


### Process

#### Pure node.js

In this porject, I firstly create the completed server by the pure node.js and query the data from mySQL database, and let front end get data from database through server. 

I create server in file of 'bin/www.js', in which I import server inner logic application funcion 'serverHandler' in 'app.js'; while in the 'app.js' file, I deal with post method by one seperated function named 'getPostDataHandler', and deal with router of 'blog' and 'user' by two external functions named 'blogRouterHandler' and 'userRouterHandler' respectively.

In order to control router easily, I create two directories, named 'model' and 'controller', and in the 'model/resModel.js' I create the response format,which including 'errorno' property, while in 'controller/blog.js' and 'controller/user.js' I create some controllers to return some fixed data based on the given router.


node.js deal with http
create development
design interface

从在浏览器输入地址到显示内容的过程
DNS解析， 建立TCP 三次握手， 处理， 并返回
server 接收到http请求，处理并请求
客户端接收到返回数据，处理数据，包括渲染页面执行js

vscode debug code 


DNS 解析，建立tcp连接，发送http请求
server 接收到http请求，处理并返回 focus on
客户端接收到返回数据，处理数据

"devDependencies": {
    "cross-env": "^5.2.0",
    "nodemon": "^1.18.10"
  },


talk about mysql
mysql workbench for sql

`
use myblog1;
-- show tables;
insert into users(username, `password`, realname) values('rick', '666', 'huangliyue');
select * from users;

select id username from users;

select * from users where username='rick';

select * from users where username='rick' and `password`='666';

select * from users where username='rick' or `password`='456';

select * from users where username like '%ri%'

select * from users where `password` like '%6%' order by id desc;

SET SQL_SAFE_UPDATES=0;
update users set realname='liyuehuang' where username='rick';
delete from users where username='liyue';

update users set state='0' where username='rick'; soft delete

select * from users where state='1';

select * from users where state<>'0';

select version();

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
and then change password as 'password'
`


note: 'bin/www1.js' server is only the warm file.



