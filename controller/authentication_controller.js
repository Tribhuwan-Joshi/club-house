const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.login_get = function (req, res, next) {
  res.render("login", { title: "Login" });
};
exports.login_post = function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  });
};

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
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Password should have at least 4 characters")
    .escape(),

  body("confirm")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm password doesn't match");
      }
      return true;
    })
    .withMessage("Confirm password doesn't match")
    .escape(),
  async function (req, res, next) {
    const errors = validationResult(req);
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
      });
      if (!errors.isEmpty()) {
        console.log(errors.array());

        res.render("signup", {
          title: "Sign up",
          username: user.username,
          errors: errors.array(),
        });
      } else {
        req.user = user;
        next();
      }
    } catch (err) {
      return next(err);
    }
  },
];

exports.membership_get = function (req, res, next) {
  res.render("membership", { title: "Get Membership" });
};

exports.membership_post = function (req, res, next) {
  res.send("post membership page");
};

exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
};
