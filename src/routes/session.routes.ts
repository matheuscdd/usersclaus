import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { Router } from "express";
import { loginUserSchema } from "../schemas/session.schemas";
import { loginUserController } from "../controllers/session.controllers";

const sessionRoutes: Router = Router();

sessionRoutes.post("", ensureDataIsValidMiddleware(loginUserSchema), loginUserController);

export default sessionRoutes;