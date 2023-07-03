exports.allposts = function (req, res, next) {
  res.render("index", { title: "Club House" });
};

exports.create_get = function (req, res, next) {
  res.send("post create form");
};

exports.delete_post_get = function (req, res, next) {
  res.send("Delete post - admin get");
};

exports.delete_post_post = function (req, res, next) {
  res.send("Delete post - admin post");
};
