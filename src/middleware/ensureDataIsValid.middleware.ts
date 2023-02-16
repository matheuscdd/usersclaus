import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";

export const ensureDataIsValidMiddleware = (schema: ZodTypeAny, arrKeys: string[] = []) => (req: Request, res: Response, next: NextFunction) => {
    if (!Object.keys(req.body).length) throw new AppError("Body is empty", 400);
    
    const validatedData = schema.parse(req.body);
    
    req.body = validatedData;
    if (!Object.keys(req.body).length) throw new AppError(`Some optional keys are missing: ${arrKeys}`, 400);
    
    return next();
}
