import { hashSync } from "bcryptjs";
import { z } from "zod";

export const returnUserSchema = z.object({
    id: z.number(),
    name: z.string().min(3).max(20),
    email: z.string().email().min(3).max(100),
    active: z.boolean(),
    admin: z.boolean().optional(),
    password: z.string().max(120).transform((pwd) => hashSync(pwd, 10)),
});

export const createUserSchema = returnUserSchema.omit({
    active: true,
    id: true
});

export const returnUserSchemaWithoutPassword = returnUserSchema.omit({
    password: true
});

export const updateUserSchema = createUserSchema.omit({
    admin: true
}).partial();