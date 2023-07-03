const User = require("../models/user");
const { body, validationResult } = require("express-validator");
exports.signup_get = function (req, res, next) {
  res.render("signup", { title: "Sign up" });
};
exports.signup_post = [
  body("username", "Username can't be empty")
    .trim()
    .escape()
    .isLength({ min: 3 }),
  body("password", "Password should atleast have 4 characters")
    .trim()
    .isLength({ min: 4 })
    .escape(),
  body("confirm", "Confirm password can't be empty")
    .trim()
    .escape()
    .isLength({ min: 4 }),

  async function (req, res, next) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
      });
      if (req.body.isAdmin && req.body.isAdmin === process.env.isAdmin) {
        user.isAdmin = true;
      }
      await user.save();
      res.redirect("/catalog/");
    } catch (err) {
      return next(err);
    }
  },
];

exports.login_get = function (req, res, next) {
  res.send("login get request");
};

exports.login_post = function (req, res, next) {
  res.send("login post request");
};

exports.getUserDetails = function (req, res, next) {
  res.send("Get user details");
};

exports.lounge_get = function (req, res, next) {
  res.send("Lounge get - ask for secret code");
};

exports.lounge_post = function (req, res, next) {
  res.send("Lounge set - check  secret code");
};
