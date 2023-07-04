const User = require("../models/user");
const { body, validationResult } = require("express-validator");
exports.signup_get = function (req, res, next) {
  res.render("signup", { title: "Sign up" });
};
exports.signup_post = [
  body("username")
    .custom(async (val) => {
      const user = await User.findOne({ username: val.toLowerCase() });
      if (user) {
        throw new Error("Username already in use");
      }
    })
    .trim()
    .escape()
    .isLength({ min: 4 })
    .withMessage("Username should have atleast 4 characters"),
  body("password", "Password should atleast have 4 characters")
    .trim()
    .isLength({ min: 4 })
    .escape(),
  body("confirm")
    .custom((val, { req }) => {
      console.log(val, typeof val, req.body.password);
      if (val !== req.body.password) {
        throw new Error("Confirm password don't match");
      }
      return val === req.body.password;
    })
    .trim()
    .escape()
    .isLength({ min: 4 }),

  async function (req, res, next) {
    const errors = validationResult(req);
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
      });
      if (!errors.isEmpty()) {
        res.render("signup", {
          title: "Sign up",
          username: user.username,
          errors: errors.array(),
        });
      } else {
        req.user = user;
        res.redirect("/user/lounge");
      }
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
  console.log(req);
  const user = req.user;
  res.send(`Lounge get user ${user}`);
};

exports.lounge_post = function (req, res, next) {
  res.send("Lounge set - check  secret code");
};
