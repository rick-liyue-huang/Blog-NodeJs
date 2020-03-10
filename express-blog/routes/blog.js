const express = require("express");
const router = express.Router();

router.get("/list", (req, res, next) => {
  res.json({
    errno: 0,
    data: [1, 2, 3]
  });
});

router.get("/detail", (req, res, next) => {
  // 自动设置了content-type: application/json
  res.json({
    errno: 0,
    data: "ok"
  });
});

module.exports = router;
