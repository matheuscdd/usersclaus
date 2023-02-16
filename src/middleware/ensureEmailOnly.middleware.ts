import { iUserResult } from "../interfaces/users.interfaces";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { client } from "../database";

export async function ensureEmailIsOnly(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const userEmail: string = req.body.email;

    const queryString: string = `--sql
        SELECT
            *
        FROM 
            users
        WHERE
            email = $1;
    `;

    const queryResult: iUserResult = await client.query(queryString, [userEmail]);

    if (queryResult.rowCount) throw new AppError("E-mail already registered", 409);

    return next();
}