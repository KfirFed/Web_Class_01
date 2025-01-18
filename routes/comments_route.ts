import express from "express";
import Comment from "../controllers/comments_controller";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The Comments API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *       Comment:
 *           type: object
 *           properties:
 *               _id:
 *                   type: string
 *               postId:
 *                   type: string
 *               content:
 *                   type: string
 *               owner:
 *                   type: string
 *           example:
 *              _id: '6742373ddfdb9be9bf02aacf'
 *              postId: 'example 67711700ddecf4fecb296703'
 *              content: 'example content'
 *              owner: 'Ofri'
 *       CreateCommentBody:
 *           type: object
 *           required:
 *              - postId
 *              - content
 *              - owner
 *           properties:
 *               postId:
 *                   type: string
 *               content:
 *                   type: string
 *               owner:
 *                   type: string
 *           example:
 *              postId: 'example 67711700ddecf4fecb296703'
 *              content: 'example content'
 *              owner: 'Ofri'
 *       UpdateCommentBody:
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
 *              postId: 'example 67711700ddecf4fecb296703'
 *              content: 'example content'
 *              owner: 'ofri'
 */

router.get("/:id", Comment.getCommentById);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     description: Return comment by ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: object
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: A comments by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comments'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */

router.get("/post/:id", Comment.getCommentsByPostId);

/**
 * @swagger
 * /comments/post/{id}:
 *   get:
 *     summary: Get a comment by post ID
 *     description: Return comment by post ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: object
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: A list of comments on a post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comments'
 *       404:
 *         description: Comments not found
 *       500:
 *         description: Server error
 */

router.post("/", authMiddleware, Comment.createComment);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     description: Create a new comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               -postId:
 *                 type: string
 *                 description: The post ID of the comment
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *               owner:
 *                  type: string
 *                  description: The owner of the comment
 *             required:
 *               - postId
 *               - content
 *               - owner
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

router.delete("/:id", authMiddleware, Comment.deleteCommentById);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     description: Delete a comment by ID
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */

router.put("/:id", authMiddleware, Comment.updateCommentById);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *       summary: Update a comment
 *       tags:
 *          - Comments
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
 *                  $ref: '#/components/schemas/UpdateCommentBody'
 *       responses:
 *           200:
 *             description: Comment updated
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Comments'
 *           400:
 *              description: Bad request
 *           404:
 *              description: Not Found
 */

export default router;
