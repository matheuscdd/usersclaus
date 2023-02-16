import { loginUserSchema } from "../schemas/session.schemas";
import { z } from "zod";

export type iUserLoginRequest = z.infer<typeof loginUserSchema>;
export type iToken = {
    token: string;
}