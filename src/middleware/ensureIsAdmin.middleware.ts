import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export async function ensureIsAdminMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    if (!req.userToken!.admin) throw new AppError("Insufficient Permission", 403);
    
    return next();
}