import { createUserController, findUserController, showUserController } from "../controllers/users.controllers";
import { Router } from "express";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists";
import { ensureEmailIsOnly } from "../middlewares/ensureEmailOnly";

const usersRoutes: Router = Router();

usersRoutes.get("", showUserController);
usersRoutes.post("", ensureEmailIsOnly, createUserController);
usersRoutes.get("/:id", ensureUserExistsMiddleware, findUserController);

export default usersRoutes;