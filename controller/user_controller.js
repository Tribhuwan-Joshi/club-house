const Post = require("../models/post");
const User = require("../models/user");

exports.getUserDetails = async function (req, res, next) {
  const id = req.params.id;
  const creator = await User.findById(id);
  const posts = await Post.find({ user: id });
  res.render("user", { creator, posts, title: creator.username });
};
