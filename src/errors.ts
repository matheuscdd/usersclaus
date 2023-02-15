import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number  = 400) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }

}

export function handleError(error: Error, req: Request, res: Response, _: NextFunction) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }
    console.log(error);
    return res.status(500).json({
        message: `Internal server error`
    });
}