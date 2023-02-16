import * as express from "express";
import { iUserWithoutPassword } from "../../interfaces/users.interfaces";

declare global {
    namespace Express {
        interface Request {
            token?: string;
            id?: number;
            user?: iUserWithoutPassword;
        }
    }
}