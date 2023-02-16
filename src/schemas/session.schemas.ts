import { z } from "zod";
import { createUserSchema } from "./users.schemas";

export const loginUserSchema = z
    .object({
        password: z.string().max(120)
    })
    .merge(createUserSchema.pick(
        { email: true 
    })
);