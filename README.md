
# Blog in Node.js (Express and Koa2)


## Introduction

Here I will use pure Node.js, Express.js and Koa2.js to complete the blog project, which only only focus on the server-end. This project includes four directories, which are Blog-Node, Blog-Express, Blog-Koa and Front-End-View, respectively. 

Firstly, I use pure Node.js to create the blog server, in order to dig the intrinsic node-server knowlodge, where I mix in many necessary skills, including mysql database to store data, redis to store session, nginx to cross front-end and server-end, log to recorde logs, xss and escape to avoid attack, crypto to encrypt password, pm2 to manage node process.

Secondly, I will reuse some coding in Express and Koa2 framework to completely quickly the blog project again by some existed modules known how to work before in the pure node project.

Thirdly, I build one basic front-end project, let it get the data in realtime from backend through ajax and jquery simply.

The purpose of project is to familiar with the node server working principle, and can use kinds of skills masterly to satisfy with customer needs.


## Tech Proposal

1. Create Server by node.js;
2. Create database by MySQL datbase;
3. Create Front-end view by jquery and ajax;
4. Establish connection between server and database;
5. Create Redis for storing session;
6. Use nginx to reverse proxy the server and front end;
7. Create methods to avoid attacks and record the logs;
8. Use pm2 in 'prod' environment.


## Project Process

### Pure node.js

In this porject, I firstly create the completed server by the pure node.js and query the data from mySQL database, and let front end get data from database through server. 

I create server in file of *'bin/www.js'*, in which I import server inner logic application funcion 'serverHandler' in 'app.js'; while in the 'app.js' file, I deal with post method by one seperated function named 'handlePostData', and deal with router of *'blog'* and *'user'* by two external functions named *'handleBlogRouter'* and *'handleUserRouter'*. In one word, *'serverHandler'* in *'App.js'* is the general function to realize the server logic application, and all details will bring out to *'handleBlogRouter'* and *'handleUserRouter'*, in *'router'* directory respectively.

In the router directory, the server will confirm the url by 'req.method' and 'req.path' display the different contents. On the specific url and method, the server will call the specific metod created in *'controller'* directory. Normally front-end and server-end communicate data by some existed format, so I create some specific mode to store these format in *'model'* directory.

In these controller methods, I will trigger sql language exported, from *'mysql.js'* in *'db'* directory, to communicate with mysql database to get data in realtime, after which I will return these data in assigned format on the front-end.

In this blog project, I will use some existed user whose username and password stored in mysql database to login the blog and create, update and delete his own blog articles, so I will use cookie and sessioin to store the username infomation. Because of the limitation of session, I will store the sessions on redis server, so that all node server processes can visit them. I create the 'req.cookie' and 'req.session' in *'app.js'*, and store the *'req.session'* in redis by *'redis.js'* in *'db'* directory.

Security is always the utmost important for network, so I use XSS module and 'escape' method to avoid these attacks, and also use *'crypto'* module to encrypt the password existed in *'cryp.js'* in *'utils'* directory. Record the logs can be easily for the staff to know how the server works well or what happend after the server broke down. I also create method in *'log.js'* in *'utils'* to record the logs. I can select different methods to record logs in 'dev' and 'prod' environment. pm2 is a process management tool, I will use it in 'prod' environment.

After all the process to complete the blog project, I master the basic skills and also know the intrinsic knowledge how to build one self-contained node server project. 


### Express.js 

In the Blog-Express directory, I create the same blog project, in which I use express.js for server and same Front-End-View pages. Here I still use *'controller'*, *'model'*, *'utils'*, *'config'* and *'db'* directories.

Because Express already mixin with some modules, so I donot need to create all the fuctions myself, I can import 'express-session' and 'connect-redis' to create session and store it in redis. I also can use 'morgan' to record logs, all of which can be applied in *'app.js'*. Express can use middleware to create the chain programming, so I create the *'loginCheck.js'* in *'middleware'* directory, which can be used in methods in 'controller' directory to confirm the user login or not. 


### Koa2.js

Similar as Express.js project, I still can use some coding in *'controller'*, *'model'*, *'utils'*, *'config'* and *'db'* directories. But Koa2 use **'async'** and **'await'** to void callback hell, so I modify the methods in methods in *'controller'* *'router'* directories. I also import 'koa-generic-session', 'koa-redis', 'koa-morgan' to create session and store it in redis.

All of the three projects I use nginx to connect server-end and front-end by avoiding cross-domain problems. and also use pm2 to manage node server process in environments.


## Project Display

Take Blog-Koa project as an example, in order to display the project well, we need to pull the project to local 
by `git clone git@github.com:rick-liyue-huang/Blog-NodeJs.git`, 
and then `cd Blog-NodeJs/Blog-Koa`, to enter the three directories, and run `npm i` to install all the modules.

Becaus this server and database run in the local, I have to create the database in local environment. I use mysql database and create the 'myblog1' database and then create 'blogs' and 'users' table to store the blogs and user data. Here has one **notice: I will use the encrypted password, so I will store the encrpted password in 'users' table.**, the password for 'myblog1' is 'password', we can refer the *'config/db.js'* file. In Mac, I normally download mysql, config it by 'MySQLWorkBench' and start it. 

We also need to use redis and nginx, I will run `brew install redis` and run `brew install nginx` in Mac to install them, by the way we also need to configurate *'/usr/local/etc/nginx/nginx.conf'* to visit the 'localhost:8088' to display pages. Front-end is stored in 'Front-End-View' directory, so we run `cd Front-End-View` and run `http-server -p 8001` to start the front-end pages, which display in 'localhost:8001'. I set the server port as 8000 in *'bin/www.js'*. Thus, 'localhost:8088/api/*/*' will display server-end, 'localhost:8001/' will display front-end, the general display will on route of 'localhost:8088/'.


## One More word

从输入地址到返回内容：
DNS解析，建立TCP连接，发送HTTP请求
server接收到HTTP请求，处理，并返回
客户端接收到返回数据，处理数据，如渲染页面执行js

database:

show databases;

use myblog;

show tables

insert into users (username, `password`, realname) values ('rick', '666', 'huangliyue');

select * from users; 

select * from users where username='rick'; 

select id from users where username like '%e%';

select * from users order by id desc;

update users set realname='liyue' where id=1;

SET SQL_SAFE_UPDATES=0;

delete from users where username='rick';

select * from users where state<>0;

alter user 'root'@'localhost' identified with mysql_native_password by 'moon978329';

## cookie session 

cookie 是存储在浏览器的一段字符串
跨域不共享
格式如 k1=v1;k2=v2;k3=v3; 因此可以存储结构化数据
每次发送HTTP请求，会将请求域的cookie一起发送给server
server可以修改cookie并且可以返回给浏览器
浏览器也可以通过javascript修改cookie

cookie总存储userid,server端对应username
session 解决的问题：
因为暴露敏感信息，需要隐藏
session 直接是js变量，放在nodejs的进程内存中
第一，进程内存有限，访问朗过大，内存暴增怎么办
第二，正式线上运行时多进程，进程之间内存无法共享

web server最常用额缓存数据库，数据存放在内存中
相比MySQL，访问速度快
成本过高，可存储的数据量更小
将web server和Redis拆分为两个单独的服务
双方都是独立的，都是可扩展的

session访问频繁，对性能要求高
session可以不考虑断电丢失数据的问题
session数据量不会太大

为何网站数据不适合Redis
操作频率不是太高
断电不能丢失，必须保留
数据量大，内存成本高

## Redis

`brew install redis`
directory
 '/usr/local/Cellar/redis/5.0.6: 13 files, 3.1MB'

 `redis-server` `redis-cli`

 set key val
 get key
 keys *
 delete key

 ## 前后端同域联调

 登录功能依赖cookie，必须用浏览器来联调
 cookie跨域不共享，前端和server必须同域
 用 nginx

 npm run i --save -g http-server

 nginx 是web服务器，开源免费
 一般做静态服务，负载均衡
 反向代理

 `brew install nginx`

 config file:
 '/usr/local/etc/nginx/nginx.conf'
 test: `nginx -t`
 run: `nginx`
 reload: `nginx -s reload`
 stop: `nginx -s stop`

in '/usr/local/etc/nginx/nginx.conf' 
 ```
location / {
          proxy_pass  http://localhost:8001;
}

location /api/ {
    proxy_pass  http://localhost:8000;
    proxy_set_header Host $Host;
}
```