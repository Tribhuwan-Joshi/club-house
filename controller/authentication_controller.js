const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.login_get = function (req, res, next) {
  res.send("get- login the user");
};
exports.login_post = function (req, res, next) {
  res.send("post- login the user");
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
  body("password", "Password should atleast have 4 characters")
    .trim()
    .isLength({ min: 4 })
    .escape(),
  body("confirm")
    .custom((val, { req }) => {
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
        next();
      }
    } catch (err) {
      return next(err);
    }
  },
  function (req, res, next) {
    const user = req.user;
    console.log("user is", user);
    res.render("lounge", { title: "Lounge", user });
  },
];

exports.membership_get = function (req, res, next) {
  res.send("Get membership page");
};

exports.membership_post = function (req, res, next) {
  res.send("post membership page");
};

exports.logout = function (req, res, next) {
  res.send(`logout the user with id ${req.params.id}`);
};
