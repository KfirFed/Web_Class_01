import express from "express";
const router = express.Router();
import usersController from "../controllers/users_controller";

router.get("/all", usersController.getAllUsers);

router.get("/:id", usersController.getUserById);

router.post("/", usersController.createUser);

router.put("/:id", usersController.updateUserById);

router.delete("/:id", usersController.deleteUserById);

export default router;