exports.allposts = function (req, res, next) {
  res.render("index", { title: "Club House" });
};

exports.post_get = function (req, res, next) {
  const id = req.params.id;
 res.render("post",{title:id})
};

exports.create_get = function (req, res, next) {
  res.send("post create form");
};

exports.delete_post_post = function (req, res, next) {
  const id = req.params.id;
  res.send(`Delete post with id ${id}`);
};
