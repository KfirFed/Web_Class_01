import express from "express";
import Comment from "../controllers/comments_controller";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/:id", Comment.getCommentById);
router.get("/post/:id", Comment.getCommentsByPostId);
router.post("/", authMiddleware, Comment.createComment);
router.delete("/:id", authMiddleware, Comment.deleteCommentById);
router.put("/:id", authMiddleware, Comment.updateCommentById);

export default router;
