import express from "express";
import usersController from "../controllers/users_controller";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *       User:
 *           type: object
 *           properties:
 *               _id:
 *                   type: string
 *               username:
 *                   type: string
 *               password:
 *                   type: string
 *               email:
 *                   type: string
 *           example:
 *              _id: '678a7e5148e49d8a24adf3b3'
 *              username: 'example username'
 *              password: 'example password'
 *              email: 'example email@gmail.com'
 *       CreateUserBody:
 *           type: object
 *           required:
 *              - username
 *              - password
 *              - email
 *           properties:
 *               username:
 *                   type: string
 *               password:
 *                   type: string
 *               email:
 *                   type: string
 *           example:
 *              username: 'Ofri'
 *              password: 'password123'
 *              email: 'ofri@gmail.com'
 *       UpdateUserBody:
 *           type: object
 *           required:
 *           properties:
 *               username:
 *                   type: string
 *               password:
 *                   type: string
 *               email:
 *                   type: string
 *           example:
 *              username: 'Ofri'
 *              password: 'new password'
 *              email: 'ofri@gmail.com'
 */

router.get("/all", usersController.getAllUsers);

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users
 *     description: Return a list of all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */

router.get("/:id", usersController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Return user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: object
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A user by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user not found
 *       500:
 *         description: Server error
 */

router.post("/", usersController.createUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               email:
 *                  type: string
 *                  description: The email of the user
 *             required:
 *              - username
 *              - password
 *              - email
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

router.put("/:id", authMiddleware, usersController.updateUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *       summary: Update a user
 *       tags:
 *          - Users
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
 *                  $ref: '#/components/schemas/UpdateUserBody'
 *       responses:
 *           200:
 *             description: User updated
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/User'
 *           400:
 *              description: Bad request
 *           404:
 *              description: Not Found
 */

router.delete("/:id", authMiddleware, usersController.deleteUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: user deleted successfully
 *       404:
 *         description: user not found
 *       500:
 *         description: Server error
 */

export default router;
