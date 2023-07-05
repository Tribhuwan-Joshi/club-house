const express = require("express");
const router = express.Router();
const post_controller = require("../controller/post_controller");



// POST Controller

router.get("/", post_controller.allposts);
router.get("/post/:id",post_controller.post_get)
router.get("/post/create", post_controller.create_get);
router.post("/post/:id/delete", post_controller.delete_post_post);

module.exports = router;
