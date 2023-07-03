const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/home");
});

router.get("/home", function (req, res, next) {
  res.render("index", { title: "Club House" });
});

module.exports = router;
