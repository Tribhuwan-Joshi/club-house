const express = require("express");
const router = express.Router();

const post_controller = require("../controller/post_controller");


// POST Controller

router.get("/", post_controller.allposts);

router.get("/post/create", post_controller.create_get);
module.exports = router;
