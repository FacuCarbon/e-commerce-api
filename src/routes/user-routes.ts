import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { verifyFirebaseToken } from "../middlewares/auth.middleware";

export const usersRouter = Router();

usersRouter.get("/", verifyFirebaseToken, UserController.getAllUsers);

usersRouter.get("/:id", verifyFirebaseToken, UserController.getUserById);

usersRouter.post("/", verifyFirebaseToken, UserController.createUser);

usersRouter.patch("/:id", verifyFirebaseToken, UserController.updateUser);

usersRouter.delete("/:id", verifyFirebaseToken, UserController.deleteUser);
