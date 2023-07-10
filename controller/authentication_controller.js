const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const brcypt = require("bcryptjs");

// strategy when user logged in
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      brcypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

//
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
exports.login_get = function (req, res, next) {
  res.render("login", { title: "Login" });
};
exports.login_post = function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};

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
          res.redirect("/");
        });
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
