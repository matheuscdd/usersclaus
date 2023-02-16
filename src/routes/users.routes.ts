import { activeUserController, createUserController, deleteUserController, findUserController, profileUserController, showUsersController, updateUserController } from "../controllers/users.controllers";
import { ensureTokenIsValidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { ensureUserExistsMiddleware } from "../middleware/ensureUserExists.middleware";
import { ensureEmailIsOnlyMiddleware } from "../middleware/ensureEmailOnly.middleware";
import { ensureIsAdminMiddleware } from "../middleware/ensureIsAdmin.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";
import { Router } from "express";

const usersRoutes: Router = Router();

usersRoutes.get("", ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, showUsersController);
usersRoutes.post("", ensureDataIsValidMiddleware(createUserSchema), ensureEmailIsOnlyMiddleware, createUserController);
usersRoutes.get("/profile", ensureTokenIsValidMiddleware, profileUserController);
usersRoutes.get("/:id", ensureUserExistsMiddleware, findUserController);
usersRoutes.delete("/:id", ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, deleteUserController);
usersRoutes.put("/:id/recover", ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, ensureUserExistsMiddleware, activeUserController);
usersRoutes.patch("/:id", ensureTokenIsValidMiddleware, ensureDataIsValidMiddleware(updateUserSchema, ["name", "email", "password"]), ensureEmailIsOnlyMiddleware, ensureUserExistsMiddleware, updateUserController);

export default usersRoutes;