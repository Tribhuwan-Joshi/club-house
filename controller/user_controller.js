exports.getUserDetails = function (req, res, next) {
  const id = req.params.id;
  res.send(`Get user details with id ${id}`);
};
