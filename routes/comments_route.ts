import express from "express";
import Comment from "../controllers/comments_controller";

const router = express.Router();

router.get("/:id", Comment.getCommentById);
router.get("/post/:id", Comment.getCommentsByPostId);
router.post("/", Comment.createComment);
router.delete("/:id", Comment.deleteCommentById);
router.put("/:id", Comment.updateCommentById);

export default router;
