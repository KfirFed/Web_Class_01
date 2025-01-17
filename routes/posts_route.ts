import express from "express";
import postsController from "../controllers/posts_controller";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/all", postsController.getAllPosts);

router.post("/", authMiddleware, postsController.createPost);

router.get("/:id", postsController.getPostById);

router.get("/", postsController.getAllPostsBySenderId);

router.put("/:id", authMiddleware, postsController.updatePostById);

export default router;
