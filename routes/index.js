const express = require("express");
const router = express.Router();
const authentication_controller = require("../controller/authentication_controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/catalog");
});

router.get("/login", authentication_controller.login_get);
router.post("/login", authentication_controller.login_post);

router.get("/signup", authentication_controller.signup_get);
router.post("/signup", authentication_controller.signup_post);

router.get("/:id/membership", authentication_controller.membership_get);
router.post("/:id/membership", authentication_controller.membership_post);

router.post("/logout", authentication_controller.logout);

module.exports = router;
