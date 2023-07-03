exports.signup_get = function (req, res, next) {
  res.render("signup", { title: "Sign up" });
};
exports.signup_post = function (req, res, next) {
  res.send("sign up post");
};

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
