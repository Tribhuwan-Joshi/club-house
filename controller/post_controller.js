exports.allposts = function (req, res, next) {
  res.render("index", { title: "Club House" , user:req.user });
};

exports.post_get = function (req, res, next) {
  const id = req.params.id;
  res.render("post", { title: id });
};

exports.create_get = function (req, res, next) {
  res.render("createPost", { title: "Create Post" });
};

exports.delete_post_post = function (req, res, next) {
  const id = req.params.id;
  res.send(`Delete post with id ${id}`);
};
