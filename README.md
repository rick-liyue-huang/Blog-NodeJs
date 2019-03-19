
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

核心：登录校验 登录信息存储
为何只讲登录 不讲注册，注册和创建博客一样的

cookie session
cookie 是实现登录的必要基础
session 是

session 写入 Redis
开发登录功能，和前端联调，用到nginx反向代理

cookie 是登录的必要条件

什么是cookie
存储在浏览器的一段字符串,最大5kb
跨域不共享：也就是不同的域内cookie是没有联系的

格式 k1=v1;k2=v2;k3=v3 因此可以存储结构化数据

每次发送http请求，会将请求域的cookie一起发送给server
server可以修改cookie 并且返回给浏览器
浏览器中也可以通过javasc修改cookie

js 操作cooki，浏览器中查看cookie

req 的时候将cookie发送给服务器
res会将修改后的cookie返回给浏览器

浏览器也可以通过javasc修改cookie， 但是不推荐，通常服务器会锁住不让修改（限制）

客户端操作cookie
三种查看方式:1
request header: Cookie
response header: set-cookie

2
application - storage - cookies

3
terminal input 'document.cookie'

一种客户端修改方式
run 'document.cookie = 'k1=100''

sever 端 node.js 操作cookie

查看cookie

修改cookie

实现登录

用cookie实现登录的缺点：
回暴露username很危险
cookie太小，

解决方式
cookie中存储userid, server端对应username
session: 即server端存储的用户信息


