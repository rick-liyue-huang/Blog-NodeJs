const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use((req, res, next) => {
  req.cookie = {
    userId: "abc"
  };
  next();
});

app.use((req, res, next) => {
  // postdata
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200
    };
    next();
  }, 1000);
});

app.use("/api", (req, res, next) => {
  console.log("deal with api router");
  next();
});

app.get("/api", (req, res, next) => {
  console.log("get api router");
  next();
});

app.post("/api", (req, res, next) => {
  console.log("post api router");
  next();
});

function loginCheck(req, res, next) {
  console.log("aaaa");
  next();
}

app.get("/api/get-cookie", loginCheck, (req, res, next) => {
  console.log("get /api/get-cookie");
  res.json({
    errno: 0,
    data: req.cookie
  });
});

app.post("/api/post-data", (req, res, next) => {
  console.log("post /api/post-dat");
  res.json({
    errno: 0,
    data: req.body
  });
});

app.use((req, res, next) => {
  console.log("deal with 404");
  res.json({
    errno: -1,
    msg: "404 not found"
  });
});

app.listen(3000, () => {
  console.log("server is running");
});
