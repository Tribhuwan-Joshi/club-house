const express = require("express");
const router = express.Router();
const user_controller = require("../controller/user_controller");
/* GET users listing. */
router.get("/:id", user_controller.getUserDetails);

module.exports = router;
