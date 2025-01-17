import express from "express";
import postsController from "../controllers/posts_controller";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The Posts API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *       Post:
 *           type: object
 *           properties:
 *               _id:
 *                   type: string
 *               title:
 *                   type: string
 *               content:
 *                   type: string
 *               senderId:
 *                   type: string
 *           example:
 *              _id: '6742373ddfdb9be9bf02aacf'
 *              title: 'example title'
 *              content: 'example content'
 *              senderId: '12345'
 *       CreatePostBody:
 *           type: object
 *           required:
 *              - title
 *              - senderId
 *           properties:
 *               title:
 *                   type: string
 *               content:
 *                   type: string
 *               senderId:
 *                   type: string
 *           example:
 *              title: 'example title'
 *              content: 'example content'
 *              senderId: '12345'
 *       UpdatePostBody:
 *           type: object
 *           required:
 *           properties:
 *               title:
 *                   type: string
 *               content:
 *                   type: string
 *               senderId:
 *                   type: string
 *           example:
 *              title: 'example title'
 *              content: 'example content'
 *              senderId: '123645'
 */

router.get("/all", postsController.getAllPosts);

/**
 * @swagger
 * /posts/all:
 *   get:
 *     summary: Get all posts
 *     description: Return a list of all posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server error
 */

router.post("/", authMiddleware, postsController.createPost);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               content:
 *                 type: string
 *                 description: The content of the post
 *               senderId:
 *                  type: string
 *                  description: The sender of the post
 *             required:
 *               - title
 *               - senderId
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

router.get("/:id", postsController.getPostById);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     description: Return post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: object
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: A single post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

router.get("/", postsController.getAllPostsBySenderId);

/**
 * @swagger
 * /posts/:
 *   get:
 *     summary: Get a post by sender ID
 *     description: Return a list of all posts by sender ID
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             properties:
 *               senderId:
 *                 type: string
 *                 description: The sender ID of the post
 *             required:
 *               - senderId
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server error
 */

router.put("/:id", authMiddleware, postsController.updatePostById);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *       summary: Update a post
 *       tags:
 *          - Posts
 *       security:
 *          - bearerAuth: []
 *       parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/UpdatePostBody'
 *       responses:
 *           200:
 *             description: Post updated
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Post'
 *           400:
 *              description: Bad request
 *           404:
 *              description: Not Found
 */

export default router;
