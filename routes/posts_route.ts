import express from "express";
const router = express.Router();
import postsController from "../controllers/posts_controller";

router.get("/all", postsController.getAllPosts);

router.post("/", postsController.createPost);

router.get("/:id", postsController.getPostById);

router.get("/", postsController.getAllPostsBySenderId);

router.put("/:id", postsController.updatePostById);

export default router;
