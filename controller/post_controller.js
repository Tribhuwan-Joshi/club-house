exports.allposts = function (req, res, next) {
  res.render("index", { title: "Club House" });
};

exports.create_get = function (req, res, next) {
  res.send("post create form");
};


