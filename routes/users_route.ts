import express from "express";
import usersController from "../controllers/users_controller";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/all", usersController.getAllUsers);

router.get("/:id", usersController.getUserById);

router.post("/", usersController.createUser);

router.put("/:id", authMiddleware, usersController.updateUserById);

router.delete("/:id", authMiddleware, usersController.deleteUserById);

export default router;
