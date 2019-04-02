
## Blog in Node.js (Express and Koa2)

### Introduction

Here I will use pure Node.js, Express.js and Koa2.js to complete the blog project, which only only focus on the server-end. This project includes four directories, which are Blog-Node, Blog-Express, Blog-Koa and Front-End-View, respectively. 

Firstly, I use pure Node.js to create the blog server, in order to dig the intrinsic node-server knowlodge, where I mix in many necessary skills, including mysql database to store data, redis to store session, nginx to cross front-end and server-end, log to recorde logs, xss and escape to avoid attack, crypto to encrypt password, pm2 to manage node process.

Secondly, I will reuse some coding in Express and Koa2 framework to completely quickly the blog project again by some existed modules known how to work before in the pure node project.

Thirdly, I build one basic front-end project, let it get the data in realtime from backend through ajax and jquery simply.

The purpose of project is to familiar with the node server working principle, and can use kinds of skills masterly to satisfy with customer needs.


### Tech Proposal

1. Create Server by node.js;
2. Create database by MySQL datbase;
3. Establish connection between server and database;
4. Let front-end get data in real time.


### Project Process

#### Pure node.js

In this porject, I firstly create the completed server by the pure node.js and query the data from mySQL database, and let front end get data from database through server. 

I create server in file of 'bin/www.js', in which I import server inner logic application funcion 'serverHandler' in 'app.js'; while in the 'app.js' file, I deal with post method by one seperated function named 'handlePostData', and deal with router of 'blog' and 'user' by two external functions named 'handleBlogRouter' and 'handleUserRouter'. In one word, 'serverHandler' in 'App.js' is the general function to realize the server logic application, and all details will bring out to 'handleBlogRouter' and 'handleUserRouter', in 'router' directory respectively.

In the router directory, the server will confirm the url by 'req.method' and 'req.path' display the different contents. On the specific url and method, the server will call the specific metod created in 'controller' directory. Normally front-end and server-end communicate data by some existed format, so I create some specific mode to store these format in 'model' directory.

In these controller methods, I will trigger sql language to communicate with mysql database to get data in realtime, after which I will return these data in assigned format on the front-end.




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

目前 session 直接是js变量，放到了nodejs进程内存中
第一进程内存有限，访问量过大，内存暴增怎么办
第二正式线上运行是多进程的，进程之间内存无法共享

解决方案 redis
web server最常用的缓存数据库，数据存在内存中
相比于mysql,访问速度快
但是成本高，可存储的数据量更小

解决方案
将web server 和 redis 拆分为两个单独的服务
双方都是独立的可以扩展的 可以扩展成集群
mysql也是一个单独的服务

session 适合 redis
session 访问频繁，对性能要求很高
session 可以不考虑断点丢失数据的问题
session 数据量不会很大 相比于 mysql

网站数据不适合用redis
操作频率不是太高
断点不能丢失，必须保留
数据量很大，成本高

run 'brew install redis'
then 
'redis-server'
'redis-cli'

in 'redis-cli' terminal
set key value
get key
keys *
del key

登录功能依赖 cookie，必须用浏览器来联调
cookie跨域不共享，前端和server必须同域
ngnix


npm i -g http-server
http-server -p 8001

ngnix
高性能web服务器，开源免费
一般用于做静态服务，负载均衡
还有免费代理

brew install nginx

config file
/usr/local/etc/nginx/nginx.conf


test:
nginx -t

start:
nginx

restart
nginx -s reload

stop:
nginx -s stop

日志：

系统没有日志，就等于人没有眼睛 qps query per second
第一： 访问日志 accees log server 最重要的日志
第二： 自定义日志 包括自定义事件，错误记录等

nodejs stream
日志功能开发和使用
日志文件拆分，日志内容分析

日志要存放到文件中
为何不存储到mysql 中
为何不存储到redis 中

因为文件很大，所以放到硬盘中，mysql 推荐存储 表结构数据


I/O 网络I 和 文件IO
文件IO 就是 readFile 和 writeFile  

相比较于CPU 计算和内存读写，IO 的突出特点就是慢
如何在有限的硬盘资源下提高IO的操作效率

所以用到 stream
标准输入输出： pipe就是管道符合水流管道模型
process.stdin.pipe(process.stdout)

日志内容会慢慢积累，放在一个文件中不好处理
按时间分日志文件 2019-02-10.access.log
实现方式 linux crontab 命令 即定时任务

crontab 格式 *****commond

分钟 小时 日期 月份 星期 .sh file

将 access.log 拷贝重命名为 2019-02-10.access.log
清空access.log文件，继续积累日志
拆分日志不需要代码

run `pwd` 查看 logs directory


run `crontab -e`

run `* 0 * * * sh /Users/liyue/Documents/gitgarden/Blog-NodeJs/logs/copyA.sh` 

run `crontab -l` 查看当前有哪些任务

日志分析
如针对access.log日志，分析chrome的占比
日志是按照行存储的，一行就是一条日志

使用 nodejs readline （基于stream, 效率高）

sql attack
sql 防范： mysql.escape
escape()

xss attack
<script>alert(document.cookie)</script>

avoid xss:
npm i --save xss

xss()

密码加密
最不应该泄露的就是用户信息

攻击方式： 获取用户名和密码 再去尝试登陆其他系统
预防： 将密码加密

use  crypto.js to get genPassword func


/*
await 后面可以追加promise对象
await必须包裹在async函数里面
async函数返回的也是promise 对象 
try-catch 截获promise 中的reject值
*/

pm2 node 进程管理工具

npm i -g pm2

pm2 list

pm2 start... 

pm2 restart <AppName>/<id>

pm2 stop <AppName>/<id> pm2 delete <AppName>/<id>

pm2 info <AppName>/<id>
pm2 log <AppName>/<id>

pm2 monit <AppName>/<id>

pm2.config.json to config pm2

使用多进程
操作系统会限制一个进程的内存
内存：单进程无法充分利用全部内存
单进程无法充分利用cpu的多核


关于运维
pm2 的核心价值：进程守护，多进程启动，线上日志记录
