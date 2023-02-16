import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email().min(3).max(100),
    password: z.string().max(120),
    admin: z.boolean(),
    active: z.boolean()
});

export const returnUserSchema = createUserSchema.extend({
    id: z.number()
});

export const returnUserSchemaWithoutPassword = returnUserSchema.omit({
    password: true
});

