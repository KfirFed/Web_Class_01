const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts_controller");

router.get("/all", postsController.getAllPosts);

router.post("/", postsController.createPost);

router.get("/:id", postsController.getPostById);

router.get("/", postsController.getAllPostsBySenderId);

module.exports = router;
