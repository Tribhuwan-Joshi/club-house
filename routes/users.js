const express = require("express");
const router = express.Router();
const user_controller = require("../controller/user_controller");
/* GET users listing. */
router.get("/signup", user_controller.signup_get);
router.post("/signup", user_controller.signup_post);
router.get("/login", user_controller.login_get);
router.post("/login", user_controller.login_post);
router.get("/lounge", user_controller.lounge_get);
router.post("/lounge", user_controller.lounge_post);
router.get("/:id/details", user_controller.getUserDetails);


module.exports = router;
