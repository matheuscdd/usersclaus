import { QueryResult } from "pg";
import { z } from "zod/lib";
import { createUserSchema, returnUserSchema, updateUserSchema } from "../schemas/users.schemas";


export type iUserRequest = z.infer<typeof createUserSchema>;
export type iUser = z.infer<typeof returnUserSchema>;
export type iUserWithoutPassword = Omit<iUser, "password">;

export type iUserResult = QueryResult<iUser>;
export type iUserResultWithoutPassword = QueryResult<iUserWithoutPassword>; 

export type iUserUpdate = z.infer<typeof updateUserSchema>;