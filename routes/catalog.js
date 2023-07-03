const express = require("express");
const router = express.Router();





router.get("/sign-up", function (req, res, next) {
  res.render("sign-up", { title: "Sign up" });
});

module.exports = router;
