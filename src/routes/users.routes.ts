import { createUserController, findUserController, profileUserController, showUserController } from "../controllers/users.controllers";
import { Router } from "express";
import { ensureUserExistsMiddleware } from "../middleware/ensureUserExists.middleware";
import { ensureEmailIsOnly } from "../middleware/ensureEmailOnly.middleware";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { createUserSchema } from "../schemas/users.schemas";


const usersRoutes: Router = Router();

usersRoutes.get("", showUserController);
usersRoutes.post("", ensureDataIsValidMiddleware(createUserSchema), ensureEmailIsOnly, createUserController);
usersRoutes.get("/profile", profileUserController);
usersRoutes.get("/:id", ensureUserExistsMiddleware, findUserController);

export default usersRoutes;