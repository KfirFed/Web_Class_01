import express from "express";
import usersController from "../controllers/users_controller";

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

router.get("/:id", usersController.getUserById);

router.post("/", usersController.createUser);

router.put("/:id", usersController.updateUserById);

router.delete("/:id", usersController.deleteUserById);

export default router;
