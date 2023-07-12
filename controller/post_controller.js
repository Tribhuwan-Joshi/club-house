const User = require("../models/user");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const createError = require("http-errors");

exports.allposts = async function (req, res, next) {
  const posts = await Post.find({}).populate("user").exec();
  const user = req.user;
  res.render("index", { title: "Club House", posts, user });
};

exports.post_get = async function (req, res, next) {
  const id = req.params.id;
  try {
    const post = await Post.findById(id).populate("user").exec();

    res.render("post", { post, user: req.user });
  } catch (err) {
    next(err);
  }
};

exports.create_get = function (req, res, next) {
  if (!req.user) {
    const err = new Error("Unauthorized Acess");
    err.status = 401;
    next(err);
  }

  res.render("createPost", { title: "Create Post" });
};

exports.create_post = [
  body("title", "Title is required").trim().escape().isLength({ min: 1 }),
  body("story", "Tale is important dude").trim().isLength({ min: 1 }),
  async function (req, res, next) {
    const id = req.params.id;
    const user = User.findById(id);
    if (!user) createError("User Not Found");
    const errors = validationResult(req);
    const post = new Post({
      user: id,
      title: req.body.title,
      story: req.body.story,
    });
    if (!errors.isEmpty()) {
      res.render("/catalog/post/create", {
        title: "Create Post",
        post: post,
        errors: errors.array(),
      });
    }
    await post.save();
    res.redirect("/");
  },
];

exports.delete_post_post = async function (req, res, next) {
  const id = req.params.id;
  try {
    await Post.findByIdAndRemove(id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
