
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
3. Create Front-end view by jquery and ajax;
3. Establish connection between server and database;
4. Create Redis for storing session;
5. Use nginx to reverse proxy the server and front end;
6. Create methods to avoid attacks and record the logs;
7. 

### Project Process

#### Pure node.js

In this porject, I firstly create the completed server by the pure node.js and query the data from mySQL database, and let front end get data from database through server. 

I create server in file of *'bin/www.js'*, in which I import server inner logic application funcion 'serverHandler' in 'app.js'; while in the 'app.js' file, I deal with post method by one seperated function named 'handlePostData', and deal with router of *'blog'* and 'user' by two external functions named 'handleBlogRouter' and 'handleUserRouter'. In one word, 'serverHandler' in 'App.js' is the general function to realize the server logic application, and all details will bring out to 'handleBlogRouter' and 'handleUserRouter', in 'router' directory respectively.

In the router directory, the server will confirm the url by 'req.method' and 'req.path' display the different contents. On the specific url and method, the server will call the specific metod created in 'controller' directory. Normally front-end and server-end communicate data by some existed format, so I create some specific mode to store these format in 'model' directory.

In these controller methods, I will trigger sql language exported, from 'mysql.js' in 'db' directory, to communicate with mysql database to get data in realtime, after which I will return these data in assigned format on the front-end.

In this blog project, I will use some existed user whose username and password stored in mysql database to login the blog and create, update and delete his own blog articles, so I will use cookie and sessioin to store the username infomation. Because of the limitation of session, I will store the sessions on redis server, so that all node server processes can visit them. I create the 'req.cookie' and 'req.session' in 'app.js', and store the 'req.session' in redis by 'redis.js' in 'db' directory.

Security is always the utmost important for network, so I use XSS module and 'escape' method to avoid these attacks, and also use 'crypto' module to encrypt the password existed in 'cryp.js' in 'utils' directory. Record the logs can be easily for the staff to know how the server works well or what happend after the server broke down. I also create method in 'log.js' in 'utils' to record the logs. I can select different methods to record logs in 'dev' and 'prod' environment. pm2 is a process management tool, I will use it in 'prod' environment.

After all the process to complete the blog project, I master the basic skills and also know the intrinsic knowledge how to build one self-contained node server project. 

