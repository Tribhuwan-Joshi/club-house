exports.getUserDetails = function (req, res, next) {
  const id = req.params.id;
  res.render("user",{title:id})
};
