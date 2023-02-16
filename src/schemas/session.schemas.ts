import { createUserSchema } from "./users.schemas";

export const loginUserSchema = createUserSchema.pick({
    email: true,
    password: true
});