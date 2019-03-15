
## Blog in Node.js

### Introduction
In this project, I use Node.js to create one server supporting one blog. It contains 'Home page', 'Author page', 'Detail page', 'Login page', 'management center', 'new page', 'edit page'.

### Tech Proposal

#### 
1. how to store data;
2. how to desgin interface.

store blog by form

### Process


#### Pure node.js

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






