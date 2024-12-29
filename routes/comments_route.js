const express = require("express");
const router = express.Router();
const Comment = require("../controllers/comments_controller");

router.get("/:id", Comment.getCommentById);
router.get("/post/:id", Comment.getCommentsByPostId);
router.post("/", Comment.createComment);
router.delete("/:id", Comment.deleteCommentById);
router.put("/:id", Comment.updateCommentById);

module.exports = router;
