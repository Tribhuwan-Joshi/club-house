const User = require("../models/user.js");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const brcypt = require("bcryptjs");
const createError = require("http-errors");

exports.login_get = function (req, res, next) {
  res.render("login", { title: "Login" });
};
exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

exports.signup_get = function (req, res, next) {
  res.render("signup", { title: "Sign up" });
};
exports.signup_post = [
  body("username")
    .custom(async (val) => {
      const user = await User.findOne({ username: val });
      console.log("val is ", val, " and user is ", user);
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
  body("adminCode")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Admin Code should have at least 4 characters")
    .escape()
    .optional({ checkFalsy: true })
    .custom((val) => {
      if (val !== process.env.ADMIN_CODE)
        throw new Error("Admin Code doesn't match");
      return true;
    }),

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
        brcypt.hash(user.password, 10, async (err, hashedPassword) => {
          user.password = hashedPassword;
          const result = await user.save();
          req.login(user, function (err) {
            if (err) {
              return next(err);
            }
            return res.redirect("/");
          });
        });
      }
    } catch (err) {
      return next(err);
    }
  },
];

exports.membership_get = function (req, res, next) {
  if (!req.user) {
    const err = createError("Unauthorized Access");
    err.status = 401;
    next(err);
  }
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
