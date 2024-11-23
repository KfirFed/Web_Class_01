const express = require("express");
const router = express.Router();

const Comment = require("../controllers/comments_controller");
router.get("/:id", Comment.getCommentById);
router.get("/post/:id", Comment.getCommentsByPostId);
router.post("/", Comment.createComment);

module.exports = router;
