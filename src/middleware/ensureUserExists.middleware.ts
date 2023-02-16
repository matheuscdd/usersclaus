import { iUserResult } from "../interfaces/users.interfaces";
import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors";

export async function ensureUserExistsMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const userId: number = Number(req.params.id);

    const queryString: string = `--sql
        SELECT
            *
        FROM 
            users
        WHERE 
            id = $1 and active = true;
    `;

    const queryResult: iUserResult = await client.query(queryString, [userId]);

    if (queryResult.rowCount === 0) throw new AppError("User not found", 404);

    return next();
}

