import { createUserController, findUserController, profileUserController, showUserController } from "../controllers/users.controllers";
import { ensureTokenIsValidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { ensureUserExistsMiddleware } from "../middleware/ensureUserExists.middleware";
import { ensureEmailIsOnlyMiddleware } from "../middleware/ensureEmailOnly.middleware";
import { createUserSchema } from "../schemas/users.schemas";
import { Router } from "express";

const usersRoutes: Router = Router();

usersRoutes.get("", showUserController);
usersRoutes.post("", ensureDataIsValidMiddleware(createUserSchema), ensureEmailIsOnlyMiddleware, createUserController);
usersRoutes.get("/profile", ensureTokenIsValidMiddleware, profileUserController);
usersRoutes.get("/:id", ensureUserExistsMiddleware, findUserController);

export default usersRoutes;